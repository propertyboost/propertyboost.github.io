const translations = {

    pt: {
        menu_home: "Home",
        menu_portfolio: "Portfólio",
        menu_pricing: "Preços",
        menu_contact: "Contato",

        hero_title: "REVITALIZAÇÃO DE FOTOS DE IMÓVEIS",
        hero_subtitle: "Transformamos suas fotos em imagens que encantam, valorizam e vendem mais.",

        portfolio_btn: "Ver Portfólio",
        pricing_btn: "Ver Preços",

        before_after: "Antes e Depois",
        before: "Antes",
        after: "Depois",

        real_estate: "Imobiliárias",
        rental: "Aluguel",
        sale: "Venda",

        plans_title: "Nossos Planos",

        essential: "Essencial",
        professional: "Profissional",

        extra_photo: "Foto adicional: R$15",

        contact_title: "Contato"
    },

    fr: {
        menu_home: "Accueil",
        menu_portfolio: "Portfolio",
        menu_pricing: "Tarifs",
        menu_contact: "Contact",

        hero_title: "REVITALISATION DE PHOTOS IMMOBILIÈRES",
        hero_subtitle: "Je transforme vos photos en images qui séduisent, valorisent et vendent davantage.",

        portfolio_btn: "Voir Portfolio",
        pricing_btn: "Voir Tarifs",

        before_after: "Avant / Après",
        before: "Avant",
        after: "Après",

        real_estate: "Agences Immobilières",
        rental: "Location",
        sale: "Vente",

        plans_title: "Nos Offres",

        essential: "Essentielle",
        professional: "Professionnelle",

        extra_photo: "Photo supplémentaire : 4 €",

        contact_title: "Contact"
    },

    en: {
        menu_home: "Home",
        menu_portfolio: "Portfolio",
        menu_pricing: "Pricing",
        menu_contact: "Contact",

        hero_title: "REAL ESTATE PHOTO ENHANCEMENT",
        hero_subtitle: "Transforming ordinary property photos into images that attract, impress and sell.",

        portfolio_btn: "View Portfolio",
        pricing_btn: "View Pricing",

        before_after: "Before & After",
        before: "Before",
        after: "After",

        real_estate: "Real Estate Agencies",
        rental: "Rental",
        sale: "Sale",

        plans_title: "Pricing Plans",

        essential: "Essential",
        professional: "Professional",

        extra_photo: "Additional Photo: $4",

        contact_title: "Contact"
    }
};

const selector = document.getElementById("language");

selector.addEventListener("change", () => {

    const lang = translations[selector.value];

    document.querySelectorAll("[data-key]").forEach(el => {
        el.innerText = lang[el.dataset.key];
    });

});