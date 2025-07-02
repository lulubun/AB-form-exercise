import './BandDescription.css';
function BandDescription ({band}) {
  /**
   * note on below: since I'm assuming I won't change the JSON, this manages the string but I would not normally use dangerouslySetInnerHTML.
   * If I have control over the API, I would recommend changing the format of the description_blurb to not include HTML tags.
   * If I don't have control over the API, I would recommend sanitizing the HTML before using it possibly with a library like DOMPurify for security reasons.
   */
  const removedEndingPeriod = band.description_blurb.endsWith('.') ? band.description_blurb.slice(0, -1) : band.description_blurb;
  return (
    <div className="band-description">
      <img src={band.imgUrl} alt={`${band.name} band`} className="band-image"/>
      <div className="band-info" dangerouslySetInnerHTML={{ __html: removedEndingPeriod }} />
    </div>
  );
}

export default BandDescription;