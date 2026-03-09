export type GlossaryTerm = {
  term: string;
  slug: string;
  definition: string;
  example: string;
};

export const glossaryData: Record<string, GlossaryTerm[]> = {
  A: [{ term: "Advance Payment", slug: "advance-payment", definition: "Amount paid before the transportation service begins.", example: "Paying ₹10,000 as advance before the truck starts." }],
  B: [{ term: "Bill of Lading (BOL)", slug: "bill-of-lading", definition: "A legal document issued by a transporter confirming receipt of goods.", example: "Transporter issues a BOL for 5 tons of material." }],
  C: [{ term: "Consignee", slug: "consignee", definition: "The person or company that receives the goods at the destination.", example: "A retailer receiving goods from a factory." }],
  D: [{ term: "Dispatch", slug: "dispatch", definition: "The process of sending goods from origin to destination.", example: "Warehouse dispatches shipment after loading." }],
  E: [{ term: "Emergency Logistics", slug: "emergency-logistics", definition: "Urgent transportation services for immediate delivery.", example: "Medical supplies sent urgently to a hospital." }],
  F: [{ term: "Freight", slug: "freight", definition: "Goods transported in bulk by truck, ship, or train.", example: "A truck carrying 20 tons of steel rods." }],
  G: [{ term: "Goods Carrier", slug: "goods-carrier", definition: "A vehicle designed specifically for transporting goods.", example: "A container truck moving construction materials." }],
  H: [{ term: "Hub", slug: "hub", definition: "A central location where shipments are redistributed.", example: "A logistics hub in Mumbai handling multiple cities." }],
  I: [{ term: "Inventory", slug: "inventory", definition: "Goods stored in a warehouse waiting to be moved.", example: "Warehouse holding 500 cartons." }],
  J: [{ term: "Just-in-Time (JIT)", slug: "just-in-time", definition: "Strategy where goods arrive exactly when needed.", example: "Factory receiving raw materials only at production start." }],
  K: [{ term: "KPI", slug: "key-performance-indicator", definition: "Metrics used to measure logistics performance.", example: "Delivery time and shipment accuracy." }],
  L: [{ term: "Lorry Receipt (LR)", slug: "lorry-receipt", definition: "Document confirming goods were received for transport.", example: "Transporter provides LR number for tracking." }],
  M: [{ term: "Multimodal", slug: "multimodal-transportation", definition: "Using multiple transport methods (truck + rail).", example: "Goods shipped by truck to port then by ship." }],
  N: [{ term: "Network Logistics", slug: "network-logistics", definition: "System where hubs and routes work together.", example: "Company using 5 distribution centers across India." }],
  O: [{ term: "Order Fulfillment", slug: "order-fulfillment", definition: "Complete process from receiving to delivering orders.", example: "Warehouse packing and shipping an order." }],
  P: [{ term: "POD", slug: "proof-of-delivery", definition: "Document confirming successful delivery.", example: "Consignee signs receipt after receiving goods." }],
  Q: [{ term: "Quotation", slug: "quotation", definition: "Price estimate for moving goods.", example: "Transporter quotes ₹25,000 for Delhi to Mumbai." }],
  R: [{ term: "Reverse Logistics", slug: "reverse-logistics", definition: "Transporting goods back from customer to seller.", example: "Product returned due to damage." }],
  S: [{ term: "Supply Chain", slug: "supply-chain", definition: "Entire network involved in delivering a product.", example: "Supplier → Manufacturer → Retailer." }],
  T: [{ term: "Transportation", slug: "transportation", definition: "The movement of goods from one location to another.", example: "Moving goods from Delhi to Jaipur." }],
  U: [{ term: "Unit Load", slug: "unit-load", definition: "Group of items transported as a single unit.", example: "Multiple cartons placed on one pallet." }],
  V: [{ term: "Vendor", slug: "vendor", definition: "A company that provides transportation services.", example: "A truck owner on a logistics platform." }],
  W: [{ term: "Warehouse", slug: "warehouse", definition: "A facility used to store goods.", example: "Storing electronics before distribution." }],
  X: [{ term: "X-Docking", slug: "cross-docking", definition: "Direct transfer from inbound to outbound trucks.", example: "Goods moved to another truck immediately at hub." }],
  Y: [{ term: "Yard Management", slug: "yard-management", definition: "Managing truck parking in warehouses.", example: "Scheduling truck entries at the gate." }],
  Z: [{ term: "Zone Distribution", slug: "zone-distribution", definition: "Dividing delivery areas into specific zones.", example: "Dividing India into North, South, East, West." }],
};