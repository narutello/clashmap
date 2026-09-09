import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";

export function SearchBar({
  defaultValue = "",
  autoFocus = false,
}: {
  defaultValue?: string;
  autoFocus?: boolean;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState(defaultValue);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next = q.trim();
    void navigate({
      to: "/search",
      search: (prev) => ({ ...prev, q: next || undefined }),
    });
  }

  return (
    <form onSubmit={submit} className="relative w-full">
      <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="جستجوی مپ، تالار یا نوع بیس…"
        aria-label="جستجوی مپ"
        autoFocus={autoFocus}
        className="pr-10"
      />
    </form>
  );
}
