//For Saving screenshots
const timeStamp = new Date().toLocaleString().replace(/\//g, '.').replace(/:/g, '.').replace(', ', '_').replace(' ', '.');

//random number function
function r(min, max) {
    return ~~(Math.random() * (max - min + 1) + min);
}

//pretends this is a phone not a desktop
const device = {
    name: 'iPhone 11 Pro Max',
    userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1',
    viewport: {
        width: 414,
        height: 896,
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        isLandscape: false,
    }
}

const targetAccounts = [
    ////////////POPULAR BOCA & DELRAY LOCAL PLACES

    'https://www.instagram.com/downtowndelray/',
    'https://www.instagram.com/visit_delray_beach/',
    'https://www.instagram.com/visitbocaraton/',
    'https://www.instagram.com/bocaratonfl/',
    'https://www.instagram.com/citybocaraton/',
    'https://www.instagram.com/bocapolice/',
    'https://www.instagram.com/delraybeachopen/',
    'https://www.instagram.com/bluefineart/',
    'https://www.instagram.com/sandbardelraybeach/',
    'https://www.instagram.com/new_vegan76/',
    'https://www.instagram.com/restorationlane/',
    'https://www.instagram.com/delraymag/',
    'https://www.instagram.com/renovatewiththeroots/',
    'https://www.instagram.com/mmwooddesigns/',
    'https://www.instagram.com/sassafraswpb/',
    'https://www.instagram.com/realtordotcom/',
    'https://www.instagram.com/sloans_southflorida/',
    'https://www.instagram.com/bocalifemag/',
    'https://www.instagram.com/oldschoolsquaredelray/',
    'https://www.instagram.com/serenitynowstaging/',
    'https://www.instagram.com/cerverare',
    'https://www.instagram.com/livingproof.photography/',
    'https://www.instagram.com/megangribblehome',
    'https://www.instagram.com/jillszedergables/',
    'https://www.instagram.com/flippingahouse/',
    'https://www.instagram.com/landscapeartinc/',
    'https://www.instagram.com/rncbuilders/',
    'https://www.instagram.com/roccostacos/',
    'https://www.instagram.com/delraybeachmarket/',
    'https://www.instagram.com/bodegataqueria/',
    'https://www.instagram.com/thegrovedelrayfl/',
    'https://www.instagram.com/cut432steakhouse/',
    'https://www.instagram.com/theheartofdelraygallery/',
    'https://www.instagram.com/bluefineart/',
    'https://www.instagram.com/artsgaragedelraybeach/',
    'https://www.instagram.com/cornellartmuseum/',
    'https://www.instagram.com/dadadelray/',
    'https://www.instagram.com/elcaminofla/',
    'https://www.instagram.com/lesorellerestaurant/',
    'https://www.instagram.com/deck84_delray/',
    'https://www.instagram.com/parktavernfl/',
    'https://www.instagram.com/brule.bistro/',
    'https://www.instagram.com/habitatforhumanity/',
    'https://www.instagram.com/bocaratonobserver/',
    'https://www.instagram.com/delraybeachgolfclub/',
    'https://www.instagram.com/puttnaround/',
    'https://www.instagram.com/sandowaydiscovery/',
    'https://www.instagram.com/sundy_house/',
];



module.exports = { device, timeStamp, r, targetAccounts };