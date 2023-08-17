import whatsapp from "@/assets/whatsapp1.png";

const WhatsappButton = () => {
  return (
    <a
      href="http://wa.me/+5492325402444"
      target="_blank"
      className="rounded-full"
    >
      <img src={whatsapp} className="w-12 aspect-square" alt="whatsapp" />
    </a>
  );
};

export default WhatsappButton;
