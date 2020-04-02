// Helpers for simulating a DB call to load our file
const fs = require( 'fs' );
const util = require( 'util' );

// Create a Promise for the file we read in - to simulate a DB call
const readFile = util.promisify(fs.readFile);

/**
 * 
 */
class SpeakerService {

  constructor( datafile ) {
    this.datafile = datafile;
  }

  /* Retrieves Plenary info in a usable format */
  async getPlenaryDetails() {
    const data = await this.getPlenaryData();
    return data.map((plenary) => {
      return {
        name: plenary.name,
        shortname: plenary.shortname,
        nickname: plenary.nickname,
        affiliation: plenary.affiliation,
        img: plenary.img,
        plenaryimg: plenary.plenaryimg,
        title: plenary.title,
        subtitle: plenary.subtitle,
        summary: plenary.summary,
        abstract: plenary.abstract,
        bio: plenary.bio,
        shortbio: plenary.shortbio,
        contact: plenary.contact ? plenary.contact : '',
        website: plenary.website ? plenary.website : '',
        email: plenary.email ? plenary.email : ''
      }
    });
  }

  /* Retrieves Names and Shortnames of Speakers only */
  async getSpeakersNames() {
    const data = await this.getData();
    return data.map((speaker) => {
      return { name: speaker.name, shortname: speaker.shortname };
    });
  }

  async getSpeakersShortList() {
    const data = await this.getData();
    return data.map((speaker) => {
      return {
        name: speaker.name,
        shortname: speaker.shortname,
        nickname: speaker.nickname,
        affiliation: speaker.affiliation,
        img: speaker.img,
        title: speaker.title,
        summary: speaker.summary
      };
    });
  }

  async getFeaturedShortList() {
    const data = await this.getFeaturedData();
    return data.map((speaker) => {
      return {
        name: speaker.name,
        shortname: speaker.shortname,
        nickname: speaker.nickname,
        affiliation: speaker.affiliation,
        img: speaker.img,
        title: speaker.title,
        subtitle: speaker.subtitle,
        summary: speaker.summary,
        name1: speaker.name1,
        name2: speaker.name2,
        name3: speaker.name3,
        aff1: speaker.aff1,
        aff2: speaker.aff2,
        aff3: speaker.aff3,
        bio1: speaker.bio1,
        bio2: speaker.bio2,
        bio3: speaker.bio3,
        img1: speaker.img1,
        img2: speaker.img2,
        img3: speaker.img3,
        contact: speaker.contact ? speaker.contact : '',
        website: speaker.website ? speaker.website : '',
        email: speaker.email ? speaker.email : ''
      };
    });
  }

  async getSpeakersFullList() {
    const data = await this.getData();
    return data.map((speaker) => {
      return {
        id: speaker.id,
        name: speaker.name,
        shortname: speaker.shortname,
        nickname: speaker.nickname,
        affiliation: speaker.affiliation,
        other: speaker.other,
        img: speaker.img,
        time: speaker.time,
        room: speaker.room,
        title: speaker.title,
        summary: speaker.summary,
        abstract: speaker.abstract,
        bio: speaker.bio,
        media: speaker.media,
        contact: speaker.contact ? speaker.contact : '',
        website: speaker.website ? speaker.website : '',
        email: speaker.email ? speaker.email : '',
        phone: speaker.phone
      };
    });
  }

  async getSpeakerDetails(shortname) {
    const data = await this.getData();
    const speaker = data.find((speaker) => {
      return speaker.shortname === shortname;
    })
    if( ! speaker ) return null;
    return {
      title: speaker.title,
      name: speaker.name,
      nickname: speaker.nickname,
      shortname: speaker.shortname,
      affiliation: speaker.affiliation,
      other: speaker.other,
      time: speaker.time,
      room: speaker.room,
      summary: speaker.summary,
      abstract: speaker.abstract,
      bio: speaker.bio,
      img: speaker.img,
      media: speaker.media,
      contact: speaker.contact ? speaker.contact : '',
      website: speaker.website ? speaker.website : '',
      email: speaker.email ? speaker.email : '',
      phone: speaker.phone
    }
  }

  async getPlenarySpeaker(shortname) {
    const data = await this.getPlenaryData();
    const speaker = data.find((speaker) => {
      return speaker.shortname === shortname;
    })
    if( ! speaker ) return null;
    return {
      title: speaker.title,
      name: speaker.name,
      nickname: speaker.nickname,
      shortname: speaker.shortname,
      affiliation: speaker.affiliation,
      other: speaker.other,
      time: speaker.time,
      room: speaker.room,
      summary: speaker.summary,
      abstract: speaker.abstract,
      bio: speaker.bio,
      img: speaker.img,
      media: speaker.media,
      contact: speaker.contact ? speaker.contact : '',
      website: speaker.website ? speaker.website : '',
      email: speaker.email ? speaker.email : '',
      phone: speaker.phone
    };
  }

  async getFeaturedSpeaker(shortname) {
    const data = await this.getFeaturedData();
    const speaker = data.find((speaker) => {
      return speaker.shortname === shortname;
    })
    if( ! speaker ) return null;
    return {
      title: speaker.title,
      subtitle: speaker.subtitle,
      name: speaker.name,
      nickname: speaker.nickname,
      shortname: speaker.shortname,
      affiliation: speaker.affiliation,
      other: speaker.other,
      time: speaker.time,
      room: speaker.room,
      summary: speaker.summary,
      abstract: speaker.abstract,
      bio: speaker.bio,
      img: speaker.img,
      media: speaker.media,
      email: speaker.email,
      phone: speaker.phone,
      name1: speaker.name1,
      name2: speaker.name2,
      name3: speaker.name3,
      aff1: speaker.aff1,
      aff2: speaker.aff2,
      aff3: speaker.aff3,
      bio1: speaker.bio1,
      bio2: speaker.bio2,
      bio3: speaker.bio3,
      img1: speaker.img1,
      img2: speaker.img2,
      img3: speaker.img3,
      contact: speaker.contact ? speaker.contact : '',
      website: speaker.website ? speaker.website : '',
      email: speaker.email ? speaker.email : '',
    };
  }

  /* Retrieves ALL Speaker data */
  async getData() {
    // Async - Await function to read in the file
    const data = await readFile(this.datafile, 'utf8');

    // Error checking (empty data)
    if( ! data ) return [];

    // Return the speakers object from the JSON file
    return JSON.parse(data).speakers;
  }

  /* Retrieves only Plenary speaker data */
  async getPlenaryData() {
    const data = await readFile(this.datafile, 'utf8');
    if( ! data ) return [];
    return JSON.parse(data).plenary;
  }

  /* Retrieves Featured speaker data */
  async getFeaturedData() {
    const data = await readFile(this.datafile, 'utf8');
    if( ! data ) return [];
    return JSON.parse(data).featured;
  }
}

module.exports = SpeakerService;