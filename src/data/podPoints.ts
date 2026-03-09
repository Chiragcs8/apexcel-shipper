export type PodPoint = {
  id: number;
  branch: string;
  head: string;
  contact: string;
  office: string;
  support: string;
  address: string;
  lat: number;
  lng: number;
  type: "Corporate" | "Operations";
};

export const podPoints: PodPoint[] = [
  {
    id: 1,
    branch: "Ahmedabad (HQ)",
    head: "Sudheer Upadhyay",
    contact: "+91 8087185179",
    office: "+91 7753911677",
    support: "+91 9974744047",
    type: "Corporate",
    lat: 22.9617,
    lng: 72.5996,
    address: "C-425, 4th Floor Bijal Business Centre, Aslali, Ahmedabad – 382427"
  },
  {
    id: 2,
    branch: "Gurgaon",
    head: "Vikash Tiwari",
    contact: "+91 8511674047",
    office: "+91 7753911677",
    support: "+91 9974744047",
    type: "Operations",
    lat: 28.4811,
    lng: 77.0930,
    address: "402, 4th Floor Pal Tower, Sikanderpur, Gurgaon – 122002"
  },
  {
    id: 3,
    branch: "Lucknow",
    head: "Amritesh Pandey",
    contact: "+91 7355949281",
    office: "+91 7753911677",
    support: "+91 9974744047",
    type: "Corporate",
    lat: 26.8126,
    lng: 80.9155,
    address: "Sector O, Mansarovar Yojana, Lucknow – 226012"
  },
  {
    id: 4,
    branch: "Lucknow Fleet",
    head: "Ajay Kumar Mishra",
    contact: "+91 8490084047",
    office: "+91 7753911677",
    support: "+91 9974744047",
    type: "Operations",
    lat: 26.8098,
    lng: 80.9178,
    address: "Sector O, Mansarovar Yojana, Lucknow – 226012"
  }
];