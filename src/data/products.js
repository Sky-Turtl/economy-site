const BASE = import.meta.env.BASE_URL;

const logo = (file) => `${BASE}logos/${file}`;

// Brand -> logo file, for brands we have artwork for.
const brandLogos = {
  Carrier: logo("carrier.svg"),
  Rheem: logo("rheem.svg"),
  York: logo("york.jpg"),
  Mitsubishi: logo("mitsubishi.svg"),
  Fujitsu: logo("fujitsu.svg"),
  "CT Morley": logo("CTM.png"),
  Tecumseh: logo("tecumseh.svg"),
  Embraco: logo("embraco.svg"),
  Sporlan: logo("sporlan.jpg"),
  Robertshaw: logo("robertshaw.svg"),
  PennBarry: logo("pennbarry.jpg"),
  Canarm: logo("canarm.jpg"),
  "Mueller Streamline": logo("mueller.jpg"),
};

const item = (name) => ({ name, logo: brandLogos[name] });

export const categories = [
  {
    key: "sheet-metal",
    name: "Sheet Metal",
    items: [
      "Snaplock Pipe & Fittings",
      "ZM",
      "Southwark",
      "Builder Best",
      "Gray Metal Trunk Duct",
    ].map(item),
  },
  {
    key: "central-ac-rooftops",
    name: "HVAC Central AC / Rooftops",
    items: ["Carrier", "Rheem", "York", "Comfortaire"].map(item),
  },
  {
    key: "watersource-heat-pump",
    name: "Watersource Heat Pump",
    items: ["Comfortaire"].map(item),
  },
  {
    key: "mini-splits",
    name: "Mini-Splits",
    items: ["Mitsubishi", "Fujitsu", "CT Morley"].map(item),
  },
  {
    key: "refrigeration",
    name: "Refrigeration",
    items: ["Tecumseh", "Embraco", "Cancoil", "Refplus"].map(item),
  },
  {
    key: "refrigeration-accessory",
    name: "Refrigeration Accessory",
    items: [
      "Sporlan",
      "Ranco",
      "White Rodgers",
      "Penn",
      "Danfoss",
      "Gasket Orders",
    ].map(item),
  },
  {
    key: "ventilation",
    name: "Ventilation",
    items: [
      "Panasonic",
      "Delhi",
      "PennBarry",
      "Ventus",
      "Twin City",
      "Acorn Air",
      "Timken & Replacement Motors",
    ].map(item),
  },
  {
    key: "water-control",
    name: "Water Control",
    items: [
      "Hot Water Pump (Mepco)",
      "Magic Air",
      "Water Regulating Valve (Penn)",
      "Water Filters",
    ].map(item),
  },
  {
    key: "tools",
    name: "Tools",
    items: [
      "Milwaukee",
      "Fieldpiece",
      "Appion",
      "Yellow Jacket",
      "Navac",
      "Mastercool",
      "Klein Tools",
      "Midwest",
      "Turbotorch",
    ].map(item),
  },
  {
    key: "ac-accessories",
    name: "Accessory for AC",
    items: [
      "Channel",
      "Linehide & Fitting",
      "Threaded Rods",
      "PVC Fittings",
      "Stands, Brackets, Disconnects & Breakers",
    ].map(item),
  },
  {
    key: "parts",
    name: "Parts",
    items: [
      "Parts for Carrier, York, Rheem, Trane, Comfortaire, Fujitsu, Mitsubishi, CTM",
      "Fuses",
      "Capacitors",
      "Lau Blower Wheels",
      "ICM",
      "White Rodgers Boards",
      "Gas Valves",
      "Danfoss Compressor",
    ].map(item),
  },
  {
    key: "chemicals",
    name: "Chemicals",
    items: [
      "Nu-Calgon Cleaning",
      "Vacuum Oils",
      "POE Oils, etc.",
      "Tape & Sealant",
      "3M (Foil & Fire Tape)",
      "Venture Duct Tape",
      "Hardcast Outdoor Duct Sealer",
      "Polymer Indoor Duct Sealer",
      "Silicone",
    ].map(item),
  },
  {
    key: "insulation",
    name: "Insulation",
    items: [
      "Duct Wrap",
      "Bubble Wrap",
      "Duct Board",
      "Flex Clad",
      "Fire Wrap",
      "Atco Flex",
    ].map(item),
  },
  {
    key: "hvac-fittings",
    name: "HVAC Fittings",
    items: [
      "Zoomlock Fittings",
      "Brazing Fittings",
      "Copper ACR (Mueller Streamline)",
      "Copper Rolls",
      "Insulated Pipes",
      "Tubing Insulation",
      "Armacell",
    ].map((name) =>
      name.startsWith("Copper ACR")
        ? { name, logo: brandLogos["Mueller Streamline"] }
        : item(name)
    ),
  },
  {
    key: "air-control",
    name: "Air Control",
    items: [
      "Access Door",
      "Fire Dampers",
      "Louvers",
      "Motorized Damper",
      "Air Control Damper",
      "BELIMO",
      "EWC",
      "Field Controls",
    ].map(item),
  },
  {
    key: "refrigerant-brazing",
    name: "Refrigerant & Brazing",
    items: ["Lucas Milhaupt", "Uniweld", "Refrigerants"].map(item),
  },
  {
    key: "thermostats-wires",
    name: "Thermostats & Wires",
    items: ["Honeywell", "Braeburn", "Southwire"].map(item),
  },
  {
    key: "grilles",
    name: "Grilles",
    items: [
      "Truair (Rectorseal)",
      "Shoemaker",
      "Linear Grilles",
      "Filters (Various Sizes)",
    ].map(item),
  },
  {
    key: "equipment-pads-isolators",
    name: "Equipment Pads & Vibration Isolators",
    items: [
      "Mason Industries",
      "PolarPads",
      "Rubber Pads",
      "Cushion Blocks",
      "Spring Isolators",
    ].map(item),
  },
];
