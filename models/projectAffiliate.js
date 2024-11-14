module.exports = function (sequelize, DataTypes) {
    const ProjectAffiliate = sequelize.define("ProjectAffiliate", {
        projectSponsor: {
            type: DataTypes.STRING, // or INT, depending on how you define the keys
            allowNull: false,
            references: {
                model: 'Projects',   // Points to the Project model
                key: 'projectSponsor' // References 'projectSponsor' column in Project
            }
        },
        affiliateName: {
            type: DataTypes.STRING, // or INT, depending on how you define the keys
            allowNull: false,
            references: {
                model: 'Affiliates', // Points to the Affiliate model
                key: 'affiliateName' // References 'affiliateName' column in Affiliate
            }
        }
    });

    return ProjectAffiliate;
};
