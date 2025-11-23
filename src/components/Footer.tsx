const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Prakhar Tiwari. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Designed & Developed with <span className="text-primary">passion</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
