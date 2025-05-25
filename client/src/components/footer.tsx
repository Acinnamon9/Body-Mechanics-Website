import { Link } from "wouter";
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-secondary font-accent text-3xl tracking-wider mb-4">BODY MECHANICS</h3>
            <p className="text-muted-foreground mb-4">
              Premium fitness experience in the heart of Janakpuri. 
              Join us to transform your body and mind.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-secondary transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/classes">
                  <a className="text-muted-foreground hover:text-secondary transition-colors">Classes</a>
                </Link>
              </li>
              <li>
                <Link href="/trainers">
                  <a className="text-muted-foreground hover:text-secondary transition-colors">Trainers</a>
                </Link>
              </li>
              <li>
                <Link href="/membership">
                  <a className="text-muted-foreground hover:text-secondary transition-colors">Membership</a>
                </Link>
              </li>
              <li>
                <Link href="/facilities">
                  <a className="text-muted-foreground hover:text-secondary transition-colors">Facilities</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-4">Classes</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Zumba</li>
              <li className="text-muted-foreground">Yoga</li>
              <li className="text-muted-foreground">Bhangra</li>
              <li className="text-muted-foreground">Strength Training</li>
              <li className="text-muted-foreground">Personal Training</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <span className="text-muted-foreground">B3/183 Janak Puri, New Delhi 110058</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-secondary mr-2" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-secondary mr-2" />
                <span className="text-muted-foreground">info@bodymechanics.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Body Mechanics Gym. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
