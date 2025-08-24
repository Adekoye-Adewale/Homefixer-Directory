export const lagosLocations = [
        { 
                value: "abule-egba", 
                title: "Abule Egba" 
        },
        { 
                value: "agege", 
                title: "Agege" 
        },
        { 
                value: "ajah", 
                title: "Ajah" 
        },
        { 
                value: "ajegunle", 
                title: "Ajegunle" 
        },
        { 
                value: "alimosho", 
                title: "Alimosho" 
        },
        { 
                value: "amuwo-odofin", 
                title: "Amuwo-Odofin" 
        },
        { 
                value: "apapa", 
                title: "Apapa" 
        },
        { 
                value: "banana-island", 
                title: "Banana Island" 
        },
        { 
                value: "bariga", 
                title: "Bariga" 
        },
        { 
                value: "chevron", 
                title: "Chevron" 
        },
        { 
                value: "cms", 
                title: "CMS" 
        },
        { 
                value: "eko-atlantic", 
                title: "Eko Atlantic" 
        },
        { 
                value: "ebute-metta", 
                title: "Ebute Metta" 
        },
        { 
                value: "egbeda", 
                title: "Egbeda" 
        },
        { 
                value: "festac-town", 
                title: "Festac Town" 
        },
        { 
                value: "gbagada", 
                title: "Gbagada" 
        },
        { 
                value: "ibeju-lekki", 
                title: "Ibeju Lekki" 
        },
        { 
                value: "ikeja", 
                title: "Ikeja"                 
        },
        { 
                value: "ikoyi", 
                title: "Ikoyi" 
        },
        { 
                value: "ikotun", 
                title: "Ikotun" 
        },
        { 
                value: "isale-eko", 
                title: "Isale Eko" 
        },
        { 
                value: "ketu", 
                title: "Ketu" 
        },
        { 
                value: "lekki-phase-1", 
                title: "Lekki Phase 1" 
        },
        { 
                value: "maryland", 
                title: "Maryland" 
        },
        { 
                value: "mushin", 
                title: "Mushin" 
        },
        { 
                value: "ojota", 
                title: "Ojota" 
        },
        { 
                value: "ojo", 
                title: "Ojo" 
        },
        { 
                value: "oshodi", 
                title: "Oshodi" 
        },
        { 
                value: "oworonshoki", 
                title: "Oworonshoki" 
        },
        { 
                value: "shomolu", 
                title: "Shomolu" 
        },
        { 
                value: "surulere", 
                title: "Surulere" 
        },
        { 
                value: "victoria-island", 
                title: "Victoria Island" 
        },
        {
                 value: "yaba", 
                title: "Yaba" 
        },
] as const

// 🔹 Type for a single location
export type LagosLocation = typeof lagosLocations[number]

// 🔹 Type for only the value field (useful for forms)
export type LagosLocationValue = typeof lagosLocations[number]["value"]
