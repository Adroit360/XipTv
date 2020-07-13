export class TvModel{
    category:string;
    name:string;
    url:string;
    logo:string;
    language:Language[];
    country:Country;
    tvg:Tvg;
}

export class Language{
    code:string;
    name:string;
}

export class Country{
    code:string;
    name:string;
}

export class Tvg{
    id:string;
    name:string;
    url:string;
}