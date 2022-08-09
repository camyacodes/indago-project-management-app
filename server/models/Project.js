const { Schema, model } = require('mongoose');

const projectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        assigned_users: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }
        ],
        tickets: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Ticket'
            }
          ]
    }
)

const Project = model('Project', projectSchema)

module.exports = Project;