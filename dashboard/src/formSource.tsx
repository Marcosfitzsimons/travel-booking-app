export const userInputs = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "yourusername",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresa tu nombre de usuario.",
      },
      minLength: {
        value: 3,
        message: "Nombre de usuario no puede ser tan corto.",
      },
      maxLength: {
        value: 15,
        message: "Nombre de usuario no puede ser tan largo.",
      },
    },
  },
  {
    id: "fullName",
    label: "Nombre completo",
    type: "text",
    placeholder: "John Doe",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresa tu nombre completo.",
      },
      minLength: {
        value: 3,
        message: "Nombre y apellido no puede ser tan corto.",
      },
      maxLength: {
        value: 25,
        message: "Nombre y apellido no puede ser tan largo.",
      },
    },
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "john_doe@gmail.com",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresa tu email.",
      },
      minLength: {
        value: 3,
        message: "Email no puede ser tan corto.",
      },
      maxLength: {
        value: 40,
        message: "Email no puede ser tan largo.",
      },
    },
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
    placeholder: "+1 234 567 89",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresa tu número celular.",
      },
      minLength: {
        value: 3,
        message: "Número celular no puede ser tan corto.",
      },
      maxLength: {
        value: 25,
        message: "Número celular no puede ser tan largo.",
      },
      pattern: {
        value: /^[0-9]+$/,
        message: "Número celular debe incluir solo números.",
      },
    },
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresa tu contraseña.",
      },
      minLength: {
        value: 3,
        message: "Contraseña no puede ser tan corta.",
      },
      maxLength: {
        value: 25,
        message: "Contraseña no puede ser tan larga.",
      },
    },
  },
  {
    id: "addressCda",
    label: "Direccion Carmen",
    type: "text",
    placeholder: "Matheu 88",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresa tu domicilio.",
      },
      minLength: {
        value: 3,
        message: "Domicilio no puede ser tan corto.",
      },
      maxLength: {
        value: 25,
        message: "Domicilio no puede ser tan largo.",
      },
    },
  },
  {
    id: "addressCapital",
    label: "Direccion Capital",
    type: "text",
    placeholder: "Dr. Lemon 448",
  },
];

export const tripInputs = [
  {
    id: "from",
    name: "from",
    label: "Desde",
    type: "text",
    placeholder: "Carmen",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar lugar de salida.",
      },
      minLength: {
        value: 3,
        message: "Lugar de salida no puede ser tan corto.",
      },
      maxLength: {
        value: 25,
        message: "Lugar de salida no puede ser tan largo.",
      },
    },
  },
  {
    id: "to",
    name: "to",
    label: "Hasta",
    type: "text",
    placeholder: "Capital",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar lugar de llegada.",
      },
      minLength: {
        value: 3,
        message: "Lugar de llegada no puede ser tan corto.",
      },
      maxLength: {
        value: 25,
        message: "Lugar de llegada no puede ser tan largo.",
      },
    },
  },
  {
    id: "price",
    name: "price",
    label: "Precio",
    type: "number",
    placeholder: "2500",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar precio/persona del viaje.",
      },
    },
  },
  {
    id: "maxCapacity",
    name: "maxCapacity",
    label: "Capacidad máxima",
    type: "number",
    placeholder: "15",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar capacidad máxima de personas del viaje.",
      },
    },
  },
  {
    id: "name",
    name: "name",
    label: "Nombre del viaje",
    type: "text",
    placeholder: "De carmen a Capital",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar nombre del viaje.",
      },
      minLength: {
        value: 3,
        message: "Nombre del viaje no puede ser tan corto.",
      },
      maxLength: {
        value: 30,
        message: "Nombre del viaje no puede ser tan largo.",
      },
    },
  },
];
