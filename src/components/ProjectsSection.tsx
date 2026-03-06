import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";
import project5 from "@/assets/project5.jpg";
import project6 from "@/assets/project6.jpg";

const projects = [
  { img: project1, title: "Shingle Roof Replacement", location: "Oakwood, OH" },
  { img: project2, title: "Metal Roof Installation", location: "Springfield, OH" },
  { img: project3, title: "Tile Roof Restoration", location: "Fairfield, OH" },
  { img: project4, title: "Colonial Re-Roof", location: "Mason, OH" },
  { img: project5, title: "Ranch Roof Overhaul", location: "Liberty Twp, OH" },
  { img: project6, title: "Modern Home Roofing", location: "West Chester, OH" },
];

const ProjectsSection = () => (
  <section id="projects" className="py-24 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-gold font-semibold text-sm uppercase tracking-widest">Our Work</span>
        <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-foreground mt-3 mb-4">Recent Projects</h2>
        <p className="text-muted-foreground text-lg">Browse our portfolio of completed roofing projects across the region.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.title} className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div>
                <h3 className="text-primary-foreground font-heading font-bold text-lg">{p.title}</h3>
                <p className="text-primary-foreground/70 text-sm">{p.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
