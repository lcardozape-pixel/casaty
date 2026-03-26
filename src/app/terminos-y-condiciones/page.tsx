import { LegalContent } from "@/components/legal/LegalContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Casaty",
  description: "Consulta los términos y condiciones de uso del sitio web de Inmobiliaria Casaty. Información sobre el uso de nuestros servicios y responsabilidades.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://casaty.pe/terminos-y-condiciones",
  },
};

const sections = [
  {
    title: "Información Relevante",
    content: "Es requisito necesario para la adquisición de los productos que se ofrecen en este sitio, que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan. El uso de nuestros servicios así como la compra de nuestros productos implicará que usted ha leído y aceptado los Términos y Condiciones de Uso en el presente documento. Todos los productos que son ofrecidos por nuestro sitio web pudieran ser creadas, cobradas, enviadas o presentadas por una página web tercera y en tal caso estarían sujetas a sus propios Términos y Condiciones. En algunos casos, para adquirir un producto, será necesario el registro por parte del usuario, con ingreso de datos personales fidedignos y definición de una contraseña."
  },
  {
    title: "Uso No Autorizado",
    content: "En caso de que aplique (para venta de software, templetes, u otros productos de diseño y programación) usted no puede colocar uno de nuestros productos, modificado o sin modificar, en un CD, sitio web o ningún otro medio y ofrecerlos para la redistribución o la reventa de ningún tipo."
  },
  {
    title: "Propiedad",
    content: "Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos, modificado o sin modificar. Todos los productos son propiedad de los proveedores del contenido. En caso de que no se especifique lo contrario, nuestros productos se proporcionan sin ningún tipo de garantía, expresa o implícita. En ningún caso esta compañía será responsable de ningún daño incluyendo, pero no limitado a, daños directos, indirectos, especiales, fortuitos o consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de utilizar nuestros productos."
  },
  {
    title: "Política de Reembolso y Garantía",
    content: "En el caso de productos que sean mercancías irrevocables no-tangibles, no realizamos reembolsos después de que se envíe el producto, usted tiene la responsabilidad de entender antes de comprarlo. Le pedimos que lea cuidadosamente antes de comprarlo. Hacemos solamente excepciones con esta regla cuando la descripción no se ajusta al producto. Hay algunos productos que pudieran tener garantía y posibilidad de reembolso pero este será especificado al comprar el producto. En tales casos la garantía solo cubrirá fallas de fábrica y sólo se hará efectiva cuando el producto se haya usado correctamente."
  },
  {
    title: "Comprobación Antifraude",
    content: "La compra del cliente puede ser aplazada para la comprobación antifraude. También puede ser suspendida por más tiempo para una investigación más rigurosa, para evitar transacciones fraudulentas."
  },
  {
    title: "Privacidad",
    content: "Este Casaty garantiza que la información personal que usted envía cuenta con la seguridad necesaria. Los datos ingresados por usuario o en el caso de requerir una validación de los pedidos no serán entregados a terceros, salvo que deba ser revelada en cumplimiento a una orden judicial o requerimientos legales. La suscripción a boletines de correos electrónicos publicitarios es voluntaria y podría ser seleccionada al momento de crear su cuenta."
  }
];

export default function TerminosPage() {
  return (
    <LegalContent 
      title="Términos y Condiciones" 
      sections={sections} 
    />
  );
}
