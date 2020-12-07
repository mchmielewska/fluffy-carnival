const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
var validate = require('mongoose-validator');

function arrayLimit(val) {
    return val.length <= 10;
  };


const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now()
    },
    privacyLevel: {
        type: String,
        enum: ['public', 'friendsOnly', 'private'],
        default: 'public'
    },
    state: {
        type: String,
        default: 'published'
    },
    tags: {
        type: [String],
        validate: [arrayLimit, 'Tags limited to 10']
    },
    authorId: {
        type: String,
        required: true
    },
    postImage: {
        type: Buffer
    },
    postImageType: {
        type: String
    }

  });

  
  PostSchema.virtual('postImagePath').get(function() {
    if (this.postImage != null && this.postImageType != null) {
      return `data:${this.postImageType};charset=utf-8;base64,${this.postImage.toString('base64')}`
    }
  })
  

PostSchema.index({
    title: 'text',
    description: 'text',
    tags: "text"
  }, {
    weights: {
      title: 5,
      description: 3,
      tags: 1
    },
  });

module.exports = model('Post', PostSchema);