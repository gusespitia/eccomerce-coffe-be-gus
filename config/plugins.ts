module.exports = {
    "strapi-neon-tech-db-branches": {
      enabled: true,
      config: {
        neonApiKey:
          "u8g5jtwdbz1ouk8sxad4d8bo7dbf4zfjxu03d45uzbzvn2koyk5123q96bvwdh4m", // get it from here: https://console.neon.tech/app/settings/api-keys
        neonProjectName: "ecommerce-coffeshop-gus", // the neon project under wich your DB runs
        neonRole: "coffeshop_owner", // create it manually under roles for your project first
        gitBranch: "main", // branch can be pinned via this config option. Will not use branch from git then. Usefull for preview/production deployment
      },
    },
  };
  