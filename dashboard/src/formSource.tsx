export const userInputs = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "yourusername",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar nombre de usuario.",
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
        message: "Por favor, ingresar nombre completo.",
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
        message: "Por favor, ingresar email.",
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
    label: "Celular",
    type: "text",
    placeholder: "+1 234 567 89",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar número celular.",
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
    id: "dni",
    label: "DNI",
    type: "text",
    placeholder: "41260178",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar DNI.",
      },
      minLength: {
        value: 3,
        message: "DNI no puede ser tan corto.",
      },
      maxLength: {
        value: 25,
        message: "DNI no puede ser tan largo.",
      },
      pattern: {
        value: /^[0-9]+$/,
        message: "DNI debe incluir solo números.",
      },
    },
  },
  {
    id: "password",
    label: "Contraseña",
    type: "password",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar contraseña.",
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
];

export const userAddressInputs = [
  {
    id: "street",
    label: "Calle",
    type: "text",
    placeholder: "Matheu",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar domicilio.",
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
    id: "streetNumber",
    label: "Número",
    type: "text",
    placeholder: "354",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar número de domicilio ",
      },
      minLength: {
        value: 1,
        message: "Número de domicilio no puede ser tan corto.",
      },
      maxLength: {
        value: 5,
        message: "Número de domicilio no puede ser tan largo.",
      },
      pattern: {
        value: /^[0-9]+$/,
        message: "Debe incluir solo números.",
      },
    },
  },
  {
    id: "crossStreets",
    label: "Calles que cruzan",
    type: "text",
    placeholder: "Matheu y D. Romero",
    validation: {
      required: {
        value: true,
        message:
          "Por favor, ingresar las calles que cruzan cerca de ese domicilio.",
      },
      minLength: {
        value: 3,
        message: "No puede ser tan corto.",
      },
      maxLength: {
        value: 40,
        message: "No puede ser tan largo.",
      },
    },
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

export const specialTripInputs = [
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

export const publicationInputs = [
  {
    id: "title",
    name: "title",
    label: "Título",
    type: "text",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar título.",
      },
      minLength: {
        value: 3,
        message: "Título no puede ser tan corto.",
      },
      maxLength: {
        value: 40,
        message: "Título no puede ser tan largo.",
      },
    },
  },
  {
    id: "subtitle",
    name: "subtitle",
    label: "Subtítulo",
    type: "text",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar subtítulo.",
      },
      minLength: {
        value: 3,
        message: "Subtítulo no puede ser tan corto.",
      },
      maxLength: {
        value: 40,
        message: "Subtítulo no puede ser tan largo.",
      },
    },
  },
  {
    id: "description",
    name: "description",
    label: "Descripción",
    type: "text",
    validation: {
      required: {
        value: true,
        message: "Por favor, ingresar descripción.",
      },
      minLength: {
        value: 3,
        message: "Descripción no puede ser tan corto.",
      },
      maxLength: {
        value: 400,
        message: "Descripción no puede ser tan largo.",
      },
    },
  },
];
