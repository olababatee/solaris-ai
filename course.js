// Solaris Course Data (Client-side)
const LESSONS = [
  {
    title: "Module 1: Safety and basics",
    lessons: [
      { id: "1.1", title: "Tools, safety gear and workshop rules", summary: "What to buy, what to wear, fire safety and the essentials.", video: "" },
      { id: "1.2", title: "Voltage, current, power and the multimeter", summary: "Volts, amps, watts and how to measure them correctly.", video: "" },
      { id: "1.3", title: "Fuses, breakers, cables and good connections", summary: "Protecting every circuit, choosing cable sizes and crimping tips.", video: "" }
    ]
  },
  {
    title: "Module 2: Build a lithium (LiFePO4) battery bank",
    lessons: [
      { id: "2.1", title: "Choosing cells, voltage and capacity", summary: "Series and parallel maths for 12 V, 24 V and 48 V setups.", video: "" },
      { id: "2.2", title: "Testing, watching and top-balancing cells", summary: "Checking cell voltage and capacity before you assemble.", video: "" },
      { id: "2.3", title: "Assembling the pack: busbars, BMS and fuse", summary: "Mechanical build, torque, BMS wiring and fusing.", video: "" },
      { id: "2.4", title: "First charge, testing and the enclosure", summary: "Commissioning checks, first charge and safe housing.", video: "" }
    ]
  },
  {
    title: "Module 3: Inverters",
    lessons: [
      { id: "3.1", title: "How an inverter works", summary: "DC to AC, sine waves, transformers and MOSFETs explained simply.", video: "" },
      { id: "3.2", title: "Assembling an inverter from a tested board and transformer", summary: "Board, transformer, MOSFETs, and wiring steps.", video: "" },
      { id: "3.3", title: "First power-up with a bulb limiter", summary: "Load tests and protection.", video: "" },
      { id: "3.4", title: "Choosing, installing and servicing ready-made inverters", summary: "Buying well, installing correctly, and troubleshooting faults.", video: "" }
    ]
  },
  {
    title: "Module 4: Complete system and troubleshooting",
    lessons: [
      { id: "4.1", title: "Wiring diagram: panels, MPPT controller, battery and inverter", summary: "How every part connects in a full hybrid/off-grid setup.", video: "" },
      { id: "4.2", title: "Cable sizing, earthing and the commissioning checklist", summary: "Preventing voltage drop, heat, and safety risks.", video: "" },
      { id: "4.3", title: "Maintenance and fault finding", summary: "Reading symptoms and fixing common faults step by step.", video: "" }
    ]
  }
];

// Make lessons globally available to the app
window.SOLARIS_COURSES = LESSONS;
