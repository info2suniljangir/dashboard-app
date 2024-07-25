//font files are downloaded at the build time and hosted with the static assets, this way it will improve performance.


import {Inter, Lusitana} from "next/font/google";


export const inter = Inter({subsets: ["latin"]});
export const lusitana = Lusitana({weight: ["400", "700"], subsets: ["latin"]});