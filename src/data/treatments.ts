export interface Treatment {
  slug: string;
  title: string;
  category: string;
  duration: string;
  downtime: string;
  tagline: string;
  description: string;
  benefits: string[];
  protocol: { step: string; detail: string }[];
  idealFor: string[];
}

export const TREATMENTS: Treatment[] = [
  {
    slug: "cellular-restructuring",
    title: "Cellular Restructuring Therapy",
    category: "Regenerative Dermatology",
    duration: "60 mins",
    downtime: "24-48 hours",
    tagline: "Deep matrix dermal stimulation and cellular renewal.",
    description:
      "A high-precision clinical protocol designed to restore extracellular matrix integrity, accelerate natural collagen synthesis, and reverse photo-induced micro-damage at the cellular level.",
    benefits: [
      "Stimulates endogenous Type I and Type III collagen production",
      "Restores dermal density and micro-elasticity",
      "Visibly reduces textural unevenness and fine dynamic lines",
    ],
    protocol: [
      { step: "01. Dermal Topology Scan", detail: "3D micro-depth mapping of tissue density." },
      { step: "02. Matrix Infusion", detail: "Targeted delivery of biomimetic growth factors." },
      { step: "03. Photodynamic Stabilization", detail: "Narrow-spectrum light activation to seal cellular pathways." },
    ],
    idealFor: ["Loss of skin firmness", "Early elastosis", "Uneven dermal texture"],
  },
  {
    slug: "laser-clearance",
    title: "Precision Laser Photorejuvenation",
    category: "Laser & Energy Systems",
    duration: "45 mins",
    downtime: "None to minimal",
    tagline: "Targeted chromophore disruption for pigment and vascular clarity.",
    description:
      "Engineered dual-wavelength optical energy calibrated specifically to eliminate recalcitrant hyperpigmentation, superficial telangiectasias, and post-inflammatory erythema without disrupting surrounding tissue.",
    benefits: [
      "Selectively destroys melanin clusters and vascular irregularities",
      "Uniform tonal equalization across facial quadrants",
      "No ablative epidermal stripping required",
    ],
    protocol: [
      { step: "01. Chromophore Calibration", detail: "Wavelength tuning tailored to melanin index." },
      { step: "02. Selective Photolysis", detail: "Micro-pulse laser passes across target zones." },
      { step: "03. Cryo-Cooling Soothe", detail: "Instant thermal recovery to prevent rebound erythema." },
    ],
    idealFor: ["Melasma & sun damage", "Post-acne red marks (PIE)", "Facial redness & broken capillaries"],
  },
  {
    slug: "facial-sculpting",
    title: "Facial Sculpting & Volumetrics",
    category: "Injectable Architecture",
    duration: "45 mins",
    downtime: "1-2 days mild swelling",
    tagline: "Anatomical structural re-balancing and harmonic contouring.",
    description:
      "Physician-led anatomical contouring utilizing high-viscoelasticity cross-linked matrices to reinforce deep structural fat pads and enhance jawline, cheek, and periorbital contours.",
    benefits: [
      "Natural structural lifting without surgical intervention",
      "Restores youthful skeletal volume distribution",
      "Physician-customized symmetry correction",
    ],
    protocol: [
      { step: "01. Vector Mapping", detail: "Detailed facial proportion and bone structure assessment." },
      { step: "02. Micro-Cannula Placement", detail: "Atraumatic injection targeting deep supra-periosteal planes." },
      { step: "03. Dynamic Evaluation", detail: "Real-time expression assessment to ensure natural kinetics." },
    ],
    idealFor: ["Mid-face volume loss", "Undefined jawline profile", "Deep nasolabial folds"],
  },
];