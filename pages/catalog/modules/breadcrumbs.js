export function breadcrumbs(category_id, title, search, resCat) {
    let breadcrumbsData;
    if (search) {
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
        if (resCat.data.data.parent_id) {
          breadcrumbsData = [
            {
              url: "/allcategories",
              title: 'Каталог',
            },
            {
              url: "/allcategories/" + resCat.data.data.parent_id,
              title: resCat.data.data.parent_name,
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