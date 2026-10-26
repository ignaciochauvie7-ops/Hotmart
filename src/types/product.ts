export interface ProductInclude {
  nombre: string;
  detalle: string;
}

export interface Product {
  slug: string;
  nombre: string;
  precio: string;
  moneda: string;
  categoria: string;
  problema: string;
  agitacion: string;
  incluye: ProductInclude[];
  paraQuien: string;
  imagen: string | null;
  ctaTexto: string;
  hotmartUrl: string;
}

export interface Category {
  slug: string;
  nombre: string;
  descripcion: string;
}
