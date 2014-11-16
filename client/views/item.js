var View = require('ampersand-view');
var templates = require('../templates');
// var _ = require('underscore');
// var raf = require('raf');
// var config = require('clientconfig');

var log = require('bows')('V:Item');

module.exports = View.extend({
    template: templates.includes.videoListItem,

    bindings: {
        link: {
            type: 'attribute',
            hook: 'media-link',
            name: 'href'
        },
        imageSrc: {
            type: 'attribute',
            hook: 'media-image',
            name: 'src'
        },
        title: {
            hook: 'media-heading',
        },
        'model.shortDescription': {
            hook: 'media-body',
        },
        'model.text': {
            hook: 'media-body'
        }

    },

    derived: {
        title: {
            deps: ['model.entityType','model.episodeTitle', 'model.seasonNum', 'model.episodeNum', 'model.title'],
            fn: function () {
                var title = '';
                if (this.model.entityType === 'Episode') {
                    if (this.model.seasonNum)
                        title += 'S'+this.model.seasonNum;
                    if (this.model.episodeNum)
                        title += 'E' + this.model.episodeNum;
                    if (title.length)
                        title += ' - ';
                    title += this.model.episodeTitle;
                } else
                    title = this.model.title;
                return  title;
            }
        },
        imageSrc: {
            deps: ['model.title'],
            fn: function () {
                return 'http://robohash.org/' + encodeURIComponent(this.model.title) + '?size=64x64';
            }
        },
        link: {
            deps: ['model.seriesId','model.tmsId'],
            fn: function () {
                return '#';
                // return '/series/' + this.model.seriesId + '/episodes/' + this.model.tmsId;
            }
        }
    },

    // initialize: function () {
    //     log('initialize');
    // },

    // onSelect: function () {
    //     var route = this.model.route || '/videos/'+this.model.id;
    //     log(route);
    //     app.navigate(route);
    // },

    render: function () {
        this.renderWithTemplate();
    }
});