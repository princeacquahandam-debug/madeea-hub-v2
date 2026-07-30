import { useEffect, useRef, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { assistantChat, type ChatMessage } from "@/lib/ai";
import { QUICK_RAIL } from "@/lib/constants";
import { Orb } from "./Orb";

const GREETING = "Hi, I'm Madeline. Ask me anything, or tap a quick action below to get started.";

// The persistent AI assistant docked in the right rail (mockup: "Madeline AI").
export function MadelineRail() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: t }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const reply = await assistantChat(next);
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...next, { role: "assistant", content: `Sorry — I hit an error: ${e instanceof Error ? e.message : String(e)}` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <aside
      className="hidden xl:flex h-full w-[322px] flex-col border-l border-border p-5 backdrop-blur-2xl"
      style={{ background: "var(--glass)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border pb-3.5">
        <Orb size={48} />
        <div className="min-w-0">
          <p className="text-base font-extrabold tracking-tight">Madeline AI</p>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "flagPulse 1.6s infinite" }} />
            Online · ready to help
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex flex-1 flex-col gap-2.5 overflow-y-auto py-3.5 pr-1">
        <Bubble ai>{GREETING}</Bubble>
        {messages.map((m, i) => (
          <Bubble key={i} ai={m.role !== "user"}>{m.content}</Bubble>
        ))}
        {busy && (
          <div className="flex items-end gap-2 self-start">
            <span className="madeline-orb h-[22px] w-[22px] shrink-0" aria-hidden="true" />
            <div className="rounded-[14px_14px_14px_4px] border border-border bg-surface-2 px-3 py-2.5">
              <span className="cc-typing"><span /><span /><span /></span>
            </div>
          </div>
        )}
      </div>

      {/* Quick actions marquee */}
      <div className="shrink-0">
        <p className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-faint">Quick actions</p>
        <div
          className="overflow-hidden py-1.5"
          style={{
            WebkitMaskImage: "linear-gradient(90deg,transparent 0,#000 8%,#000 92%,transparent 100%)",
            maskImage: "linear-gradient(90deg,transparent 0,#000 8%,#000 92%,transparent 100%)",
          }}
        >
          <div className="qa-marquee flex w-max gap-3 px-1">
            {[...QUICK_RAIL, ...QUICK_RAIL].map((label, i) => (
              <button
                key={i}
                onClick={() => send(label)}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface-2 px-4 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <Sparkles size={16} className="text-accent" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="mt-3 flex shrink-0 items-center gap-2 rounded-2xl border border-border py-1.5 pl-3.5 pr-1.5"
        style={{ background: "var(--glass-2)" }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Madeline anything…"
          aria-label="Ask Madeline anything"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-text outline-none placeholder:text-faint"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-transform hover:scale-105 disabled:opacity-40"
          aria-label="Send"
        >
          <ArrowUp size={18} />
        </button>
      </form>
    </aside>
  );
}

function Bubble({ ai, children }: { ai?: boolean; children: React.ReactNode }) {
  if (ai) {
    return (
      <div className="flex max-w-[90%] items-end gap-2 self-start">
        <span className="madeline-orb h-[22px] w-[22px] shrink-0" aria-hidden="true" />
        <div className="rounded-[14px_14px_14px_4px] border border-border bg-surface-2 px-3.5 py-2.5 text-[13px] leading-relaxed">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-[90%] self-end rounded-[14px_14px_4px_14px] bg-accent px-3.5 py-2.5 text-[13px] leading-relaxed text-white">
      {children}
    </div>
  );
}
