export function breadcrumbs({category_id, title, searchInput, resCat}) {
    let breadcrumbsData;
    if (searchInput) {
      breadcrumbsData = [
        {
          url: "",
          title: "Поиск"
        },
      ]
    } else {
      if(!category_id){
        breadcrumbsData = [
          {
            url: "/allcategories",
            title: 'Каталог',
          },
        ];
      } else if (resCat) {
        if (resCat.parent_id) {
          breadcrumbsData = [
            {
              url: "/allcategories",
              title: 'Каталог',
            },
            {
              url: "/allcategories/" + resCat.parent_id,
              title: resCat.parent_name,
            },
            {
              url: "/catalog/" + category_id,
              title: title,
            },
          ];
        } else {
          breadcrumbsData = [
            {
              url: "/allcategories",
              title: 'Каталог',
            },
            {
              url: "/catalog/" + category_id,
              title: title,
            },
          ];
        }
      } else {
        breadcrumbsData = [
          {
            url: "/catalog/" + category_id,
            title: title,
          },
        ];
      }
    }
    return breadcrumbsData;
}