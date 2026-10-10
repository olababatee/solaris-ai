// Solaris Course - Netlify Function (Node 18+, no dependencies).
// THIS FILE HOLDS YOUR LESSONS. To add a video, paste its https link into the "video" field of a lesson
// (YouTube link such as https://www.youtube.com/watch?v=XXXXXXXXXXX, or a direct https link ending in .mp4).
// These links stay on the server: only people who paid for the course ever receive them.
// "video" = YOUR OWN video (embedded for paying students). "links" = other creators' public videos, shown with their name as
// "watch on YouTube" links (not embedded). Use only your own videos or videos you have written permission to embed.
// Environment variables: PAYSTACK_SECRET_KEY (required), MIN_COURSE_AMOUNT (optional, naira).

const LESSONS = [
  { title: "Module 1: Safety and basics", lessons: [
    { id: "1.1", title: "Tools, safety gear and workshop rules", summary: "What to buy, what to wear, fire safety and the rules you never break.", video: "", links: [{ title: "Is LiFePO4 a fire risk? How to make safe battery connections", by: "Ray Builds Cool Stuff", url: "https://www.youtube.com/watch?v=ZzKR6tYRlwM" }, { title: "Lithium-ion battery safety", by: "LAFD", url: "https://www.youtube.com/watch?v=TyeU9ZGulfQ" }] },
    { id: "1.2", title: "Voltage, current, power and the multimeter", summary: "Volts, amps, watts and how to measure them safely.", video: "", links: [{ title: "How to use a multimeter for beginners", by: "Ratchets And Wrenches", url: "https://www.youtube.com/watch?v=TdUK6RPdIrA" }] },
    { id: "1.3", title: "Fuses, breakers, cables and good connections", summary: "Protecting every circuit, choosing cable and making tight, clean joints.", video: "", links: [{ title: "The only video you need to understand cable and fuse sizing", by: "There's A Trick For That", url: "https://www.youtube.com/watch?v=2aWYl4T9p3s" }, { title: "Cable size for solar panels: wire size for voltage drop", by: "Cleversolarpower by Nick", url: "https://www.youtube.com/watch?v=sxgntlX4EzY" }] }
  ]},
  { title: "Module 2: Build a lithium (LiFePO4) battery bank", lessons: [
    { id: "2.1", title: "Choosing cells, voltage and capacity", summary: "Series and parallel maths for 12 V, 24 V and 48 V banks.", video: "", links: [{ title: "Beginner DIY 12V LiFePO4 battery, step by step", by: "Projects With Everyday Dave", url: "https://www.youtube.com/watch?v=t8bdp_boQt8" }] },
    { id: "2.2", title: "Testing, matching and top-balancing cells", summary: "Checking cell voltage and capacity before you build.", video: "", links: [{ title: "How to top balance your battery cells the easy way", by: "Power Guys USA", url: "https://www.youtube.com/watch?v=ECT9xAcQ0gw" }, { title: "DIY LiFePO4 battery part 2: balancing cells", by: "Lock your Hubs 4WDing", url: "https://www.youtube.com/watch?v=J4ZnbxsPX4I" }] },
    { id: "2.3", title: "Assembling the pack: busbars, BMS and fuse", summary: "Mechanical build, torque, BMS wiring and main fuse.", video: "", links: [{ title: "Build a powerful 12V 100Ah LiFePO4 battery pack, step by step", by: "DIY Electrix", url: "https://www.youtube.com/watch?v=kS8GdqbJVrA" }, { title: "DIY 12V 100Ah LiFePO4 solar battery", by: "DIY Solar Power with Will Prowse", url: "https://www.youtube.com/watch?v=vTFLuKjvUQw" }] },
    { id: "2.4", title: "First charge, testing and the enclosure", summary: "Commissioning checks, first charge and safe installation.", video: "", links: [] }
  ]},
  { title: "Module 3: Inverters", lessons: [
    { id: "3.1", title: "How an inverter works", summary: "DC to AC, sine waves, transformers and MOSFETs explained simply.", video: "", links: [{ title: "Power inverters explained: how they work", by: "The Engineering Mindset", url: "https://www.youtube.com/watch?v=iIqhAX0I7lI" }] },
    { id: "3.2", title: "Assembling an inverter from a tested board and transformer", summary: "Board, transformer, MOSFET stage, heat sink and wiring.", video: "", links: [{ title: "DIY 1kW sine wave inverter (12V to 220V, EGS002)", by: "TechBuilder", url: "https://www.youtube.com/watch?v=I8c5DLJgS3o" }] },
    { id: "3.3", title: "First power-up with a bulb limiter, load tests and protections", summary: "Safe first start, measuring output and adding protections.", video: "", links: [{ title: "Build a current limiter for safe testing", by: "12voltvids", url: "https://www.youtube.com/watch?v=vXlWSKU_lPI" }] },
    { id: "3.4", title: "Choosing, installing and servicing ready-made inverters", summary: "Buying well, installing correctly and basic servicing.", video: "", links: [{ title: "Renogy: how to troubleshoot your inverter", by: "Renogy", url: "https://www.youtube.com/watch?v=8tkCihw4HYw" }] }
  ]},
  { title: "Module 4: Complete system and troubleshooting", lessons: [
    { id: "4.1", title: "Wiring diagram: panels, MPPT controller, battery and inverter", summary: "How every part connects and in what order.", video: "", links: [{ title: "Complete 12V solar system wiring diagram for beginners", by: "solar circuit 360", url: "https://www.youtube.com/watch?v=RFJEyrNLilc" }] },
    { id: "4.2", title: "Cable sizing, earthing and the commissioning checklist", summary: "Preventing voltage drop, heat and shock; final checks before switching on.", video: "", links: [{ title: "Solar grounding explained", by: "Solartime with Martyna", url: "https://www.youtube.com/watch?v=C7YXUzL5qE4" }] },
    { id: "4.3", title: "Maintenance and fault finding", summary: "Reading symptoms and fixing common faults step by step.", video: "", links: [{ title: "Solar inverter beeping continuously", by: "Ricardo Gardener", url: "https://www.youtube.com/watch?v=kwHkJUjPcVg" }, { title: "Renogy: how to troubleshoot your inverter", by: "Renogy", url: "https://www.youtube.com/watch?v=8tkCihw4HYw" }] }
  ]}
];

const J = (s, o) => ({ statusCode: s, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify(o) });
const okRefs = new Map();

// Confirms with Paystack that this reference is a successful payment for the given plan ("lifetime" or "course").
async function paid(ref, plan, minNaira) {
  const key = ref + "|" + plan, c = okRefs.get(key);
  if (c && c > Date.now()) return true;
  const r = await fetch("https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref), {
    headers: { Authorization: "Bearer " + process.env.PAYSTACK_SECRET_KEY }, signal: AbortSignal.timeout(6000)
  });
  const j = await r.json().catch(() => null), d = j && j.status && j.data;
  if (!d) return false;
  let md = d.metadata; if (typeof md === "string") { try { md = JSON.parse(md); } catch (e) { md = {}; } }
  if (d.status === "success" && d.reference === ref && md && md.plan === plan && d.amount >= (minNaira || 0) * 100) {
    okRefs.set(key, Date.now() + 6 * 3600e3); return true;
  }
  return false;
}

exports.LESSONS = LESSONS;
exports.paid = paid;
exports.handler = async (event) => {
  if (event.httpMethod === "GET") // public preview: titles only, no videos
    return J(200, { modules: LESSONS.map(m => ({ title: m.title, lessons: m.lessons.map(l => ({ id: l.id, title: l.title })) })) });
  if (event.httpMethod !== "POST") return J(405, { error: "GET or POST only" });
  if (!process.env.PAYSTACK_SECRET_KEY) return J(503, { error: "Not configured" });
  let b; try { b = JSON.parse(event.body || "{}"); } catch (e) { return J(400, { error: "Bad request" }); }
  const ref = String(b.ref || "");
  if (!/^SC[a-z0-9]{6,40}$/i.test(ref)) return J(402, { error: "Course purchase required" });
  try { if (!(await paid(ref, "course", +process.env.MIN_COURSE_AMOUNT || 0))) return J(402, { error: "Payment not found" }); }
  catch (e) { console.error("verify:", e.message); return J(502, { error: "Could not verify payment" }); }
  return J(200, { modules: LESSONS.map(m => ({ title: m.title, lessons: m.lessons.map(l => ({
    id: l.id, title: l.title, summary: l.summary, video: /^https:\/\/\S+$/.test(l.video || "") ? l.video : "",
    links: (l.links || []).filter(k => /^https:\/\/\S+$/.test(k.url || "")).map(k => ({ title: String(k.title || ""), by: String(k.by || ""), url: k.url })) })) })) });
};
