import { Neighbourhood } from '../types';

export const NEIGHBOURHOODS: Neighbourhood[] = [
  {
    id: 'didsbury',
    name: 'Didsbury & West Didsbury',
    borough: 'South Manchester',
    tagline: 'Tree-lined Victorian avenues, bohemian Burton Road, and botanical parkland',
    description: 'Renowned as South Manchester’s most coveted residential enclave, Didsbury balances leafy pastoral peace with cosmopolitan flair. From independent bistros on Burton Road to the centuries-old pubs of Didsbury Village and the rare specimen trees of Fletcher Moss Botanical Gardens.',
    image: '/src/assets/images/hero_manchester_terrace_1791150513168.jpg',
    character: 'Village atmosphere, grand red-brick Victorian villas, vibrant independent café culture, and the peaceful banks of the River Mersey.',
    transport: [
      'West Didsbury (Metrolink to City Centre - 18 mins)',
      'Didsbury Village (Metrolink - 16 mins)',
      'East Didsbury (National Rail to Piccadilly - 9 mins)'
    ],
    schools: [
      'Beaver Road Primary School (Ofsted Outstanding)',
      'Didsbury CE Primary School',
      'The Barlow RC High School & Sixth Form'
    ],
    highlights: [
      'Fletcher Moss Botanical Gardens & Alpine Tea Rooms',
      'Burton Road independent delis, bars, and Hispi bistro',
      'The Albert Club historic lawn tennis & bowling green',
      'Mersey River Valley walking trail'
    ],
    vibe: 'Leafy, family-focused, culinary, relaxed',
    propertyTypes: 'Double-fronted Victorian merchant villas, Edwardian semi-detached homes, and architectural garden apartments.'
  },
  {
    id: 'ancoats',
    name: 'Ancoats & Northern Quarter',
    borough: 'Manchester City Centre',
    tagline: 'World-famous industrial heritage revitalised as Manchester’s creative epicentre',
    description: 'Once crowned the world’s first industrial suburb, Ancoats has undergone an extraordinary cultural revival. Centred around Cutting Room Square, red-brick cotton mills house soaring loft apartments with exposed cast-iron colonnades, adjacent to Michelin-starred dining and independent bakeries.',
    image: '/src/assets/images/neighbourhood_ancoats_mills_1791150524809.jpg',
    character: 'Dramatic industrial architecture, cobblestones, canal towpaths, artisan sourdough bakeries, and lively piazza gatherings.',
    transport: [
      'Manchester Piccadilly (Intercity & Metrolink - 7 mins walk)',
      'New Islington (Metrolink - 4 mins walk)',
      'Manchester Victoria (National Rail & Tram - 12 mins walk)'
    ],
    schools: [
      'New Islington Free School (Ofsted Outstanding)',
      'St Patrick’s RC Primary School',
      'Abbey College Manchester'
    ],
    highlights: [
      'Cutting Room Square outdoor dining & Halle St Peter’s',
      'Mana (Manchester’s Michelin-starred restaurant)',
      'Pollon Bakery & Erst natural wine bar',
      'New Islington Marina canal basin'
    ],
    vibe: 'Architectural, gastronomic, creative, metropolitan',
    propertyTypes: 'Grade II listed cotton mill conversions, canal-side duplexes, and contemporary penthouses.'
  },
  {
    id: 'chorlton',
    name: 'Chorlton & The Green',
    borough: 'South Manchester',
    tagline: 'Bohemian community spirit, independent shops, and sprawling green reserves',
    description: 'Chorlton-cum-Hardy has long captured the hearts of artists, academics, and young families. Beech Road remains one of the North West’s premier independent high streets, leading past historic thatched cottages at Chorlton Green out to the vast nature sanctuaries of Chorlton Water Park.',
    image: '/src/assets/images/property_garden_flat_1791149585982.jpg',
    character: 'Eclectic bohemian charm, organic grocers, leafy Victorian terraces, and vast dog-friendly meadows and lakes.',
    transport: [
      'Chorlton (Metrolink - 14 mins to St Peter’s Square)',
      'Barlow Moor Road (Metrolink - 12 mins)',
      'Stretford (Metrolink / Cycle route - 6 mins)'
    ],
    schools: [
      'Chorlton Park Primary (Ofsted Outstanding)',
      'St John’s RC Primary School',
      'Chorlton High School'
    ],
    highlights: [
      'Beech Road independent delis, The Lead Station, & San Juan',
      'Chorlton Water Park lake and nature reserve',
      'The Horse & Jockey 500-year-old coaching inn on the Green',
      'Unicorn Grocery independent cooperative'
    ],
    vibe: 'Artistic, community-led, green, independent',
    propertyTypes: 'High-ceilinged Victorian bay-fronted terraces, 1930s garden homes, and converted schoolhouses.'
  },
  {
    id: 'altrincham',
    name: 'Altrincham & Hale',
    borough: 'Trafford & Cheshire Border',
    tagline: 'Award-winning market culture, premier grammar schools, and Cheshire elegance',
    description: 'Consistently voted one of the best places to live in the UK, Altrincham combines historic Cheshire market prestige with sleek urban energy. Anchored by the celebrated covered Altrincham Market, the town offers elite schools, expansive parks, and direct Metrolink access to the city.',
    image: '/src/assets/images/property_georgian_islington_1791149574741.jpg',
    character: 'Upscale market town refinement, boutique high streets, prestigious grammar schools, and expansive Cheshire estates.',
    transport: [
      'Altrincham Interchange (Metrolink & Mid-Cheshire Rail - 22 mins to city)',
      'Hale Station (Direct rail to Manchester & Chester)',
      'Manchester Airport (12 mins drive)'
    ],
    schools: [
      'Altrincham Grammar School for Boys (Ranked #1 North West)',
      'Altrincham Grammar School for Girls (Ofsted Outstanding)',
      'Loreto Grammar School'
    ],
    highlights: [
      'Altrincham Market House artisan food hall & market stalls',
      'Stamford Park Victorian landscaped gardens',
      'Dunham Massey National Trust deer park and estate',
      'Hale Village boutique dining and bars'
    ],
    vibe: 'Prestigious, educational excellence, vibrant market, refined',
    propertyTypes: 'Substantial Victorian & Edwardian detached residences, Cheshire country houses, and luxury mews homes.'
  }
];
