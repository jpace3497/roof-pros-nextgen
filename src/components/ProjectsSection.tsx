import { ArrowRight, Clock, MapPin } from "lucide-react";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";
import project5 from "@/assets/project5.jpg";
import project6 from "@/assets/project6.jpg";

const projects = [
  { img: project1, title: "Architectural Shingle Roof Replacement", location: "Worcester, MA", type: "Full Replacement", duration: "Completed in 3 Days" },
  { img: project2, title: "Standing Seam Metal Roof", location: "Springfield, MA", type: "New Installation", duration: "Completed in 5 Days" },
  { img: project3, title: "Historic Slate Roof Restoration", location: "Cambridge, MA", type: "Restoration", duration: "Completed in 7 Days" },
  { img: project4, title: "Colonial Re-Roof & Gutter System", location: "Newton, MA", type: "Re-Roof + Gutters", duration: "Completed in 4 Days" },
  { img: project5, title: "Storm Damage Emergency Repair", location: "Framingham, MA", type: "Emergency Repair", duration: "Completed in 1 Day" },
  { img: project6, title: "Modern Flat Roof with TPO Membrane", location: "Brookline, MA", type: "Commercial", duration: "Completed in 6 Days" },
];

const ProjectsSection = () => (
  <section id="projects" className="py-24 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-gold font-semibold text-sm uppercase tracking-widest">Our Work</span>
        <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-foreground mt-3 mb-4">
          Real Roofing Projects Across Massachusetts
        </h2>
        <p className="text-muted-foreground text-lg">
          See the quality craftsmanship our team delivers on every roof.
        </p>
      </div>

      {/* Top row: 2 large featured */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {projects.slice(0, 2).map((p) => (
          <ProjectCard key={p.title} project={p} featured />
        ))}
      </div>

      {/* Bottom row: 4 smaller */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.slice(2).map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </div>
  </section>
);

interface ProjectCardProps {
  project: (typeof projects)[0];
  featured?: boolean;
}

const ProjectCard = ({ project: p, featured }: ProjectCardProps) => (
  <div className={`group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer ${featured ? "h-[400px] lg:h-[440px]" : "h-[280px] lg:h-[300px]"}`}>
    <div className="absolute inset-0 overflow-hidden">
      <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    </div>
    {/* Info bar */}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/70 to-transparent p-5 pt-20">
      <h3 className={`text-primary-foreground font-heading font-bold ${featured ? "text-lg lg:text-xl" : "text-sm lg:text-base"} mb-1`}>{p.title}</h3>
      <div className="flex items-center gap-3 text-primary-foreground/60 text-xs">
        <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{p.duration}</span>
      </div>
      <span className="inline-block mt-2 text-gold/80 text-xs font-semibold bg-gold/10 px-2.5 py-1 rounded-full">{p.type}</span>
    </div>
    {/* Hover overlay */}
    <div className="absolute inset-0 bg-navy-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <span className="inline-flex items-center gap-2 bg-gold text-accent-foreground font-bold text-sm px-6 py-3 rounded-xl shadow-lg translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
        View Project <ArrowRight className="w-4 h-4" />
      </span>
    </div>
  </div>
);

export default ProjectsSection;
