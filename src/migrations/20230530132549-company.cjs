'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('company', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            company_name: {
                type: Sequelize.STRING(30)
            },
            company_address: {
                type: Sequelize.TEXT
            },
            company_image: {
                type: Sequelize.STRING(100)
            },
            client_website: {
                type: Sequelize.STRING(100)
            },
            primary_contact_name: {
                type: Sequelize.STRING(30)
            },
            primary_phone_number: {
                type: Sequelize.STRING(30)
            },
            primary_email_address: {
                type: Sequelize.STRING(75)
            },
            secondary_contact_name: {
                type: Sequelize.STRING(30)
            },
            secondary_phone_number: {
                type: Sequelize.STRING(30)
            },
            secondary_email_address: {
                type: Sequelize.STRING(75)
            },
            remote_link: {
                type: Sequelize.STRING(150)
            },
            data_base: {
                type: Sequelize.STRING(30)
            },
            api_url: {
                type: Sequelize.STRING(150)
            },
            main_url: {
                type: Sequelize.STRING(150)
            },
            firebase_url: {
                type: Sequelize.STRING(150)
            },
            iframe_url: {
                type: Sequelize.STRING(150)
            },
            is_parent: {
                type: Sequelize.INTEGER
            },
            parent_id: {
                type: Sequelize.INTEGER
            },
            is_team_enable: {
                type: Sequelize.INTEGER
            },
            active_status: {
                type: Sequelize.INTEGER
            },
            delete_status: {
                type: Sequelize.INTEGER
            },
            created_by: {
                type: Sequelize.INTEGER
            },
            updated_by: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    async down(queryInterface, Sequelize) {

    }
};