import Footer from "../../../components/Footer"
import Image
 from "next/image"
export default function MoviesPage() {
    return(
        <div>
        <h1>Hello</h1>
        <p> if you see this, routing worked (no way)</p>
        <button>
            <image src={refresh} alt="magnifying glass"></image>
        </button>
        <div>
            Placeholder for movies
        </div>
        <Footer />
        </div>
    
    
    )
      
}