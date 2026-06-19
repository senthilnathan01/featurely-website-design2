import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const js = await readFile(new URL("../main.js", import.meta.url), "utf8");

test("ships core SEO metadata and structured data", () => {
  assert.match(html, /<title>Featurely AI \| Explainable Behavioral Simulations/);
  assert.match(html, /name="description"/);
  assert.match(html, /rel="canonical" href="https:\/\/featurely\.ai\/"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /"@type": "SoftwareApplication"/);
  assert.match(html, /property="og:image"/);
});

test("uses one semantic H1 and exposes core sections", () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  for (const id of ["model", "simulations", "evidence", "research", "how-it-works"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

test("contains all six explainable decision layers", () => {
  for (const layer of ["Perception", "Context", "Memory", "Bias", "Motivation", "Choice"]) {
    assert.match(html, new RegExp(`>${layer}<`));
  }
  assert.equal((html.match(/data-force-step="/g) ?? []).length, 6);
  assert.equal((html.match(/data-layer="/g) ?? []).length, 6);
  assert.equal((html.match(/class="layer-node"/g) ?? []).length, 5);
  assert.equal((html.match(/class="layer-node layer-node--choice"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /class="engine-label/);
});

test("includes accessibility and reduced-motion support", () => {
  assert.match(html, /class="skip-link"/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(js, /IntersectionObserver/);
});

test("keeps production links on approved Featurely properties", () => {
  assert.match(html, /https:\/\/app\.featurely\.ai\/signup/);
  assert.match(html, /https:\/\/app\.featurely\.ai\/login/);
  assert.match(html, /https:\/\/krishnanamasivayam\.substack\.com\//);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/featurely-ai/);
});
