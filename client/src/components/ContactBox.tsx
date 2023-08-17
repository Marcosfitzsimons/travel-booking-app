import WhatsappButton from "./WhatsappButton";

type ContactBoxProps = {
  children: React.ReactNode;
};

const ContactBox = ({ children }: ContactBoxProps) => {
  return (
    <div className="flex items-center gap-1 py-2 px-5 rounded-lg border bg-card shadow-input dark:shadow-none">
      <div className="flex flex-col items-center">
        <p>{children}</p>
        <a
          href="http://wa.me/+5492325402444"
          target="_blank"
          className="font-medium text-accent"
        >
          Contáctanos
        </a>
      </div>
      <WhatsappButton />
    </div>
  );
};

export default ContactBox;
