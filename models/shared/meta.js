const DateTimeKey = require('./datetimekey');

module.exports = class Meta {
    constructor(props) {
        this.created   = new DateTimeKey(props.created);
        this.createdBy = props.createdBy;
        this.version   = props.version;
        this.updated   = new DateTimeKey(props.updated);
        this.updatedBy = props.updatedBy;
    }

    unload() {
        return {
            created:   this.created.unload(),
            createdBy: this.createdBy,
            version:   this.version,
            updated:   this.updated.unload(),
            updatedBy: this.updatedBy
        };
    }

    static newDocument(by) {
        return new Meta({

            created:   new Date().toDateTimeKey(),
            createdBy: by,
            version:   1,
            updated:   new Date().toDateTimeKey(),
            updatedBy: by

        }).unload();
    }

    static update(prevMeta, by) {
        return new Meta({

            created:   prevMeta.created,
            createdBy: prevMeta.createdBy,
            version:   prevMeta.version + 1,
            updated:   new Date().toDateTimeKey(),
            updatedBy: by

        }).unload();
    }
}