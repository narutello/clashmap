import assert from "node:assert/strict";
import { test } from "node:test";
import { categorizeBase } from "./categorize.ts";
import { extractCopyLinks, parseCopyLink } from "./copy-link.ts";

test("parses official OpenLayout links and extracts TH + slot", () => {
  const parsed = parseCopyLink(
    "https://link.clashofclans.com/en?action=OpenLayout&id=TH18%3AWB%3AAAAAMwAAAAJ8_jtp6RRc8U3ZCZTYot51",
  );
  assert.ok(parsed);
  assert.equal(parsed.townHall, 18);
  assert.equal(parsed.slot, "WB");
  assert.equal(parsed.layoutKey, "TH18:WB:AAAAMwAAAAJ8_jtp6RRc8U3ZCZTYot51");
});

test("rejects non-clash URLs", () => {
  assert.equal(parseCopyLink("https://example.com/?action=OpenLayout&id=TH18:WB:abc"), null);
});

test("duplicate layout keys collapse to one identity", () => {
  const a = parseCopyLink(
    "https://link.clashofclans.com/en?action=OpenLayout&id=TH17:HV:AAAAAAEXAMPLE",
  );
  const b = parseCopyLink(
    "https://link.clashofclans.com/?action=OpenLayout&id=TH17%3AHV%3AAAAAAAEXAMPLE",
  );
  assert.ok(a && b);
  assert.equal(a.layoutKey, b.layoutKey);
});

test("categorizes war bases from source type and slot", () => {
  const result = categorizeBase({
    sourceType: "War",
    slot: "WB",
    townHall: 17,
    tags: ["cwl", "anti-3-star"],
    name: "TH17 Legend anti 3 star",
  });
  assert.equal(result.townHall, 17);
  assert.equal(result.baseType, "war");
  assert.ok(result.tags.includes("anti3") || result.tags.includes("legend"));
});

test("infers farming from HV slot when type is missing", () => {
  const result = categorizeBase({ slot: "HV", townHall: 12, name: "farm ring" });
  assert.equal(result.baseType, "farming");
});

test("extracts copy links from mixed text", () => {
  const links = extractCopyLinks(
    "try https://link.clashofclans.com/en?action=OpenLayout&id=TH10:WB:abc123 please",
  );
  assert.equal(links.length, 1);
});
