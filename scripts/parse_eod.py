import json, re, io, sys

# Section headers, as actually written by the team. Everyone formats differently:
# "Tasks Completed", "1. Done today:", "**2. Blockers:**", "Accomplishment for today: 7/14".
DONE  = re.compile(r'^(tasks?\s*completed|done\s*today|accomplishments?\s*for\s*today|eod\b.*)$', re.I)
BLOCK = re.compile(r'^(blockers?|blockers?\s*/\s*challenges?|challenges?|issues?)$', re.I)
PLAN  = re.compile(r'^(plans?\s*(for)?\s*(the)?\s*(following\s*day|next\s*day|tomorrow)?|for\s*tomorrow|next\s*steps?)$', re.I)

# A "nothing to report" answer. These sit under a Blockers heading but are the
# opposite of a blocker, so they must not be counted as one.
NONE = re.compile(
    r'^\s*(none|nil|n/?a|nothing(\s+to\s+report)?|no\s+updates?'
    r'|(no|none)\s*(blockers?|issues?|problems?)?\s*'
    r'(so\s+far|today|at\s+(the\s+)?moment|at\s+this\s+time|for\s+now|encountered|yet)?'
    r')\s*[.!]?\s*$', re.I)

# A line that is only punctuation/bullet residue (e.g. the trailing "**" of a
# markdown heading) — never real content.
JUNK = re.compile(r'^[\W_]*$')
# A bare date fragment left over from headers like "Accomplishment for today: 7/14".
DATE_FRAG = re.compile(r'^\d{1,2}/\d{1,2}(/\d{2,4})?$')

BULLET = re.compile(r'^[\-\*•·●▪◦]\s*')


def _strip_md(s):
    """Remove markdown bold/italic wrappers a few members use."""
    s = s.strip()
    prev = None
    while prev != s:
        prev = s
        s = re.sub(r'^\*\*|\*\*$', '', s).strip()
        s = re.sub(r'^__|__$', '', s).strip()
    return s


def clean_header(ls):
    s = _strip_md(ls)
    s = re.sub(r'^\d+[\.\)]\s*', '', s).strip()
    s = re.sub(r'\s*:\s*$', '', s).strip()
    return re.sub(r'\s+', ' ', s)


def _clean_item(piece):
    p = BULLET.sub('', piece.strip())
    p = _strip_md(p)
    return p.strip()


def _keep(item):
    if not item:
        return False
    if JUNK.match(item):
        return False
    if DATE_FRAG.match(item):
        return False
    if NONE.match(item):
        return False
    return True


def parse(text):
    sec = {'done': [], 'blockers': [], 'plans': []}
    cur = None
    for raw in text.split('\n'):
        line = raw.replace(' ', ' ').rstrip()
        ls = line.strip()
        if not ls:
            continue

        # Headers appear both with and without a colon ("Tasks Completed" as well
        # as "1. Done today:"), so always test the text before any colon. The
        # length guard stops a long prose sentence from being read as a heading.
        head, sep, rest = ls.partition(':')
        h = clean_header(head)
        matched = None
        if h and len(h) <= 45:
            if DONE.match(h):
                matched = 'done'
            elif BLOCK.match(h):
                matched = 'blockers'
            elif PLAN.match(h) and re.search(r'plan|tomorrow|next', h, re.I):
                matched = 'plans'

        if matched:
            cur = matched
            # Content sometimes trails the heading on the same line, separated by
            # a run of spaces or an inline "-Item" bullet.
            for piece in re.split(r'\s{3,}|(?<=[a-z])\s*(?=-[A-Z])', _strip_md(rest)):
                p = _clean_item(piece)
                if _keep(p):
                    sec[matched].append(p)
            continue

        if cur is None:
            cur = 'done'
        item = _clean_item(ls)
        if _keep(item):
            sec[cur].append(item)
    return sec


if __name__ == '__main__':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    d = json.load(io.open('eod_real.json', encoding='utf-8'))
    out = [{**e, **parse(e['text'])} for e in d['entries']]
    print('TOTALS: done=%d blockers=%d plans=%d' % (
        sum(len(o['done']) for o in out),
        sum(len(o['blockers']) for o in out),
        sum(len(o['plans']) for o in out)))
    print('\nremaining short items (sanity check):')
    for o in out:
        for k in ('done', 'blockers', 'plans'):
            for t in o[k]:
                if len(t) < 18:
                    print(f'  [{k:8}] {o["person"][:12]:12} {t!r}')
    print('\nall blockers:')
    for o in out:
        for t in o['blockers']:
            print(f'  [{o["person"][:12]:12}] {t[:80]}')
