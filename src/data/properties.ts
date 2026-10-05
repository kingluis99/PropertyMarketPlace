import { Property } from '../types';
import heroManchesterImg from '../assets/images/hero_manchester_terrace_1791150513168.jpg';
import periodGeorgianImg from '../assets/images/property_georgian_islington_1791149574741.jpg';
import gardenFlatImg from '../assets/images/property_garden_flat_1791149585982.jpg';
import loftIndustrialImg from '../assets/images/property_loft_shoreditch_1791149564311.jpg';
import ancoatsMillsImg from '../assets/images/neighbourhood_ancoats_mills_1791150524809.jpg';
import sellerLivingImg from '../assets/images/seller_valuation_living_1791149595710.jpg';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Victorian Double-Fronted Villa with Private Walled Grounds',
    address: 'Lapwing Lane, West Didsbury, Manchester, M20 6UR',
    area: 'Didsbury & West Didsbury',
    postcode: 'M20 6UR',
    listingType: 'sale',
    price: 1150000,
    propertyType: 'Terraced House',
    bedrooms: 5,
    bathrooms: 3,
    sqft: 2850,
    tenure: 'Freehold',
    epcRating: 'C',
    councilTaxBand: 'Band G',
    featured: true,
    images: [
      heroManchesterImg,
      periodGeorgianImg,
      gardenFlatImg
    ],
    description: 'A distinguished five-bedroom Victorian merchant residence commanding a prime position along leafy Lapwing Lane, featuring soaring 3.4m corniced ceilings, dual reception rooms, and a secluded landscaped south-facing garden.',
    longDescription: [
      'Standing proudly along one of West Didsbury’s most celebrated tree-lined avenues, this substantial Victorian residence has been sensitively renovated with meticulous regard for its architectural heritage.',
      'A broad stone portico opens to an expansive entrance vestibule laid with encaustic encaustic tiles. Two grand formal reception rooms flank the hallway, boasting original black marble chimneypieces, tall bay sash windows with working box shutters, and ornate plasterwork friezes.',
      'To the garden level, an open-concept kitchen and breakfast pavilion features bespoke dark oak cabinetry, honed Carrara marble work surfaces, and black steel Crittall doors opening out onto a tranquil stone dining terrace framed by mature wisteria.',
      'The upper levels provide five generous double bedrooms, including a principal suite with bespoke dressing alcove and a limestone-clad bathroom with freestanding roll-top cast-iron tub.'
    ],
    features: [
      'Five double bedrooms and three bathrooms',
      'Mature south-facing walled garden with stone dining terrace',
      'Dual formal drawing rooms with original working fireplaces',
      'Handmade bespoke kitchen with steel Crittall glazing',
      'Restored pine floorboards and high-specification underfloor heating',
      'Freehold tenure with driveway parking for three vehicles',
      'Two minutes walk to West Didsbury Metrolink and Burton Road'
    ],
    floorplanRooms: [
      { level: 'Lower Ground', room: 'Kitchen & Family Pavilion', dimensions: '8.6m × 4.8m (28\'3" × 15\'9")' },
      { level: 'Lower Ground', room: 'Wine Vault & Pantry', dimensions: '3.2m × 2.4m (10\'6" × 7\'10")' },
      { level: 'Raised Ground', room: 'Drawing Room', dimensions: '6.2m × 4.5m (20\'4" × 14\'9")' },
      { level: 'Raised Ground', room: 'Formal Library / Study', dimensions: '5.4m × 4.2m (17\'9" × 13\'9")' },
      { level: 'First Floor', room: 'Principal Bedroom Suite', dimensions: '5.6m × 4.4m (18\'4" × 14\'5")' },
      { level: 'First Floor', room: 'Dressing Room & En-suite', dimensions: '4.1m × 3.2m (13\'5" × 10\'6")' },
      { level: 'Second Floor', room: 'Bedrooms Two & Three', dimensions: '4.8m × 3.9m (15\'9" × 12\'10")' }
    ],
    coordinates: { x: 50, y: 72 },
    transport: [
      { station: 'West Didsbury', line: 'Metrolink (Pink Line)', walkMinutes: 3 },
      { station: 'Didsbury Village', line: 'Metrolink', walkMinutes: 8 },
      { station: 'Fletcher Moss Gardens', line: 'Botanical Park', walkMinutes: 7 }
    ],
    agent: {
      name: 'Eleanor Sterling',
      role: 'Head of Sales · South Manchester',
      phone: '+44 (0)161 445 7788',
      email: 'eleanor.sterling@anthonyandco.co.uk',
      branch: 'Didsbury Office, 748 Wilmslow Road, M20'
    }
  },
  {
    id: 'prop-2',
    title: 'Historic Cotton Mill Loft with Exposed Brick & Cast-Iron Columns',
    address: 'Royal Mill, Cutting Room Square, Ancoats, M4 5BF',
    area: 'Ancoats & Northern Quarter',
    postcode: 'M4 5BF',
    listingType: 'sale',
    price: 435000,
    propertyType: 'Converted Loft',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1180,
    tenure: 'Share of Freehold',
    epcRating: 'B',
    councilTaxBand: 'Band D',
    featured: true,
    images: [
      loftIndustrialImg,
      ancoatsMillsImg,
      sellerLivingImg
    ],
    description: 'An authentic lateral loft set within the Grade II* listed Royal Mill on Cutting Room Square, celebrating original timber-beamed ceilings, exposed Victorian brickwork, and full-width multi-pane factory windows.',
    longDescription: [
      'Positioned on the third floor of the historic Royal Mill—one of the crowning achievements of Manchester’s textile industrial revolution—this corner loft offers peerless character.',
      'A 28-foot open-plan living and dining hall features sandblasted red brickwork, structural cast-iron pillars stamped with Victorian foundry marks, and solid oiled oak herringbone parquet.',
      'The contemporary kitchen is designed with matte charcoal cabinetry, composite stone countertops, and integrated Siemens appliances. A Crittall glass divider leads through to a serene guest bedroom/office space.',
      'Both bedrooms are quietly buffered from street noise, with a luxury bathroom clad in polished microcement with matt black fixtures.'
    ],
    features: [
      'Grade II* Listed Victorian cotton mill conversion circa 1898',
      'Original exposed red brick and structural iron columns',
      'Dual-aspect multi-pane factory sash windows',
      'Concierge service and grand glass-roofed internal atrium',
      'Right on Cutting Room Square, moments from Michelin-starred Mana',
      'Seven minutes walk to Manchester Piccadilly station'
    ],
    floorplanRooms: [
      { level: 'Third Floor', room: 'Main Living & Dining Hall', dimensions: '8.6m × 5.8m (28\'3" × 19\'0")' },
      { level: 'Third Floor', room: 'Kitchen Zone', dimensions: '3.8m × 2.9m (12\'6" × 9\'6")' },
      { level: 'Third Floor', room: 'Principal Bedroom', dimensions: '4.6m × 3.6m (15\'1" × 11\'10")' },
      { level: 'Third Floor', room: 'Second Bedroom / Studio', dimensions: '3.5m × 3.0m (11\'6" × 9\'10")' }
    ],
    coordinates: { x: 56, y: 38 },
    transport: [
      { station: 'Manchester Piccadilly', line: 'Mainline Rail & Metrolink', walkMinutes: 7 },
      { station: 'New Islington', line: 'Metrolink', walkMinutes: 4 },
      { station: 'Cutting Room Square', line: 'Piazza Centre', walkMinutes: 1 }
    ],
    agent: {
      name: 'Marcus Beaumont',
      role: 'Associate Director · City Centre & Ancoats',
      phone: '+44 (0)161 832 9900',
      email: 'marcus.beaumont@anthonyandco.co.uk',
      branch: 'Ancoats Office, Cutting Room Square, M4'
    }
  },
  {
    id: 'prop-3',
    title: 'Restored Victorian Townhouse with Landscaped Courtyard',
    address: 'Beech Road, Chorlton-cum-Hardy, Manchester, M21 9EQ',
    area: 'Chorlton & The Green',
    postcode: 'M21 9EQ',
    listingType: 'sale',
    price: 695000,
    propertyType: 'Terraced House',
    bedrooms: 4,
    bathrooms: 2,
    sqft: 1820,
    tenure: 'Freehold',
    epcRating: 'C',
    councilTaxBand: 'Band E',
    featured: true,
    images: [
      gardenFlatImg,
      heroManchesterImg,
      periodGeorgianImg
    ],
    description: 'An exceptional four-bedroom Victorian residence directly off iconic Beech Road, boasting a bespoke kitchen extension with terrazzo finishes, period stained glass, and a tranquil walled courtyard.',
    longDescription: [
      'Situated within moments of Chorlton Green and the independent boutiques of Beech Road, this period townhouse effortlessly unites Victorian architectural volume with modern Scandinavian craftsmanship.',
      'Original stained glass welcomes you into a bay-fronted double reception room featuring restored floorboards, twin log burners, and bespoke alcove shelving.',
      'The rear extension is a masterwork of light, showcasing vaulted ceilings with automated Velux windows, exposed structural timber rafters, and wide sliding doors opening out to a walled courtyard garden with outdoor pizza oven and cedar seating.'
    ],
    features: [
      'Four spacious bedrooms across three floors',
      'Vaulted architectural kitchen extension with garden access',
      'Original Victorian stained glass and restored cornices',
      'Working wood-burning stoves in both reception zones',
      'Freehold ownership within Chorlton Green Conservation Area',
      'Five minutes walk to Chorlton Metrolink station'
    ],
    floorplanRooms: [
      { level: 'Ground Floor', room: 'Living Room', dimensions: '4.8m × 3.9m (15\'9" × 12\'10")' },
      { level: 'Ground Floor', room: 'Kitchen & Dining Space', dimensions: '7.2m × 4.4m (23\'7" × 14\'5")' },
      { level: 'First Floor', room: 'Bedroom One', dimensions: '4.6m × 3.8m (15\'1" × 12\'6")' },
      { level: 'First Floor', room: 'Bedroom Two', dimensions: '3.9m × 3.1m (12\'10" × 10\'2")' },
      { level: 'Top Floor', room: 'Loft Suite & En-suite', dimensions: '5.2m × 4.1m (17\'1" × 13\'5")' }
    ],
    coordinates: { x: 44, y: 64 },
    transport: [
      { station: 'Chorlton', line: 'Metrolink', walkMinutes: 6 },
      { station: 'Chorlton Green', line: 'Conservation Enclave', walkMinutes: 2 },
      { station: 'Chorlton Water Park', line: 'Nature Reserve', walkMinutes: 10 }
    ],
    agent: {
      name: 'Oliver Cross',
      role: 'Director · Chorlton & South Manchester',
      phone: '+44 (0)161 881 2244',
      email: 'oliver.cross@anthonyandco.co.uk',
      branch: 'Chorlton Office, 128 Beech Road, M21'
    }
  },
  {
    id: 'prop-4',
    title: 'Architect-Designed Garden Flat with Landscaped Courtyard',
    address: 'Burton Road, West Didsbury, Manchester, M20 2LN',
    area: 'Didsbury & West Didsbury',
    postcode: 'M20 2LN',
    listingType: 'rent',
    price: 1650,
    pricePeriod: 'pcm',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 840,
    tenure: 'Leasehold',
    epcRating: 'B',
    councilTaxBand: 'Band C',
    featured: true,
    images: [
      sellerLivingImg,
      gardenFlatImg,
      heroManchesterImg
    ],
    description: 'A stylish garden apartment occupying the ground floor of an imposing Victorian villa on Burton Road, complete with polished concrete underfloor heating, terrazzo surfaces, and a private bamboo garden.',
    longDescription: [
      'Nestled behind private laurel hedging on West Didsbury’s premier dining street, this impeccably designed two-bedroom apartment offers a calming urban haven.',
      'The open-plan kitchen and living area showcases bespoke birch-ply cabinetry, terrazzo quartz breakfast island, and floor-to-ceiling Crittall doors leading to a secluded sunlit courtyard.',
      'Two tranquil bedrooms feature bespoke fitted wardrobes and acoustic double glazing, served by an architectural wetroom with rain shower and brushed brass hardware.'
    ],
    features: [
      'Private enclosed landscaped garden terrace',
      'Polished concrete flooring with individual room heating zones',
      'Architectural bespoke joinery and integrated appliances',
      'Off-street allocated parking space with EV charging point',
      'Two minutes walk to Burton Road Metrolink'
    ],
    floorplanRooms: [
      { level: 'Ground Floor', room: 'Kitchen & Reception', dimensions: '6.8m × 4.2m (22\'4" × 13\'9")' },
      { level: 'Ground Floor', room: 'Courtyard Garden', dimensions: '4.8m × 3.6m (15\'9" × 11\'10")' },
      { level: 'Ground Floor', room: 'Primary Bedroom', dimensions: '3.8m × 3.2m (12\'6" × 10\'6")' },
      { level: 'Ground Floor', room: 'Guest Bedroom / Office', dimensions: '3.2m × 2.8m (10\'6" × 9\'2")' }
    ],
    coordinates: { x: 52, y: 74 },
    transport: [
      { station: 'Burton Road', line: 'Metrolink (Pink Line)', walkMinutes: 2 },
      { station: 'Didsbury Village', line: 'Metrolink', walkMinutes: 10 },
      { station: 'Fletcher Moss', line: 'Park Walk', walkMinutes: 12 }
    ],
    agent: {
      name: 'Eleanor Sterling',
      role: 'Head of Sales · South Manchester',
      phone: '+44 (0)161 445 7788',
      email: 'eleanor.sterling@anthonyandco.co.uk',
      branch: 'Didsbury Office, 748 Wilmslow Road, M20'
    }
  },
  {
    id: 'prop-5',
    title: 'Waterfront Warehouse Duplex with Basin Balcony',
    address: 'Slate Wharf, Castlefield, Manchester, M3 4LX',
    area: 'Ancoats & Northern Quarter',
    postcode: 'M3 4LX',
    listingType: 'sale',
    price: 525000,
    propertyType: 'Maisonette',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1450,
    tenure: 'Share of Freehold',
    epcRating: 'C',
    councilTaxBand: 'Band E',
    featured: false,
    images: [
      loftIndustrialImg,
      ancoatsMillsImg,
      periodGeorgianImg
    ],
    description: 'An exceptional waterside duplex within an authentic brick merchant warehouse overlooking Castlefield canal basin, offering a private water-facing balcony, vaulted brick barrel ceilings, and secure allocated parking.',
    longDescription: [
      'Standing directly on the historic cobbled wharves of Castlefield, this characterful three-bedroom duplex celebrates Manchester’s water heritage.',
      'The reception level boasts exposed red-brick vaulted barrel ceilings, original iron tie-plates, and wide French timber doors opening to a private balcony suspended over the Bridgewater Canal.',
      'An architectural spiral staircase ascends to the upper gallery master suite with en-suite shower and skylit vaulted eaves.'
    ],
    features: [
      'Direct waterside balcony overlooking Castlefield Basin',
      'Vaulted red brick barrel ceilings and iron ties',
      'Secure gated undercroft parking space included',
      'Share of Freehold with long 999-year underlying lease',
      'Four minutes walk to Deansgate-Castlefield Metrolink & Rail'
    ],
    floorplanRooms: [
      { level: 'Second Floor', room: 'Vaulted Living & Dining Area', dimensions: '7.8m × 5.2m (25\'7" × 17\'1")' },
      { level: 'Second Floor', room: 'Canal Balcony', dimensions: '4.2m × 1.6m (13\'9" × 5\'3")' },
      { level: 'Second Floor', room: 'Kitchen', dimensions: '3.6m × 2.8m (11\'10" × 9\'2")' },
      { level: 'Upper Mezzanine', room: 'Master Gallery Suite', dimensions: '5.4m × 4.2m (17\'9" × 13\'9")' }
    ],
    coordinates: { x: 48, y: 44 },
    transport: [
      { station: 'Deansgate-Castlefield', line: 'Metrolink & Rail', walkMinutes: 4 },
      { station: 'Spinningfields', line: 'Financial District', walkMinutes: 8 },
      { station: 'Manchester Oxford Road', line: 'Mainline Rail', walkMinutes: 11 }
    ],
    agent: {
      name: 'Marcus Beaumont',
      role: 'Associate Director · City Centre & Ancoats',
      phone: '+44 (0)161 832 9900',
      email: 'marcus.beaumont@anthonyandco.co.uk',
      branch: 'Ancoats Office, Cutting Room Square, M4'
    }
  },
  {
    id: 'prop-6',
    title: 'Canal-Side Loft Apartment at New Islington Marina',
    address: 'Redhill Street, Ancoats, Manchester, M4 7BS',
    area: 'Ancoats & Northern Quarter',
    postcode: 'M4 7BS',
    listingType: 'rent',
    price: 1850,
    pricePeriod: 'pcm',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 920,
    tenure: 'Leasehold',
    epcRating: 'B',
    councilTaxBand: 'Band D',
    featured: false,
    images: [
      ancoatsMillsImg,
      loftIndustrialImg,
      sellerLivingImg
    ],
    description: 'A contemporary canal-front home overlooking the yachts and paddleboarders of New Islington Marina, offering floor-to-ceiling windows, timber balcony, and open-plan designer kitchen.',
    longDescription: [
      'Perched directly above the tranquil waters of New Islington Marina, this bright dual-aspect apartment offers peaceful waterside vistas paired with immediate access to Pollen Bakery and Ancoats piazza.',
      'A vast living-dining-kitchen room enjoys uninterrupted water outlooks, leading to a cedar-decked balcony.',
      'Two equal-sized double bedrooms feature fitted wardrobes, making the apartment ideal for professional couples or sharers.'
    ],
    features: [
      'Private waterfront balcony overlooking New Islington Marina',
      'Dual-aspect layout with floor-to-ceiling glazing',
      'Contemporary kitchen with quartz counters and wine fridge',
      'Short stroll to Manchester Piccadilly and New Islington Metrolink',
      'Available furnished to an exceptional standard'
    ],
    floorplanRooms: [
      { level: 'Second Floor', room: 'Living & Dining Room', dimensions: '6.4m × 4.6m (21\'0" × 15\'1")' },
      { level: 'Second Floor', room: 'Marina Balcony', dimensions: '3.8m × 1.8m (12\'6" × 5\'11")' },
      { level: 'Second Floor', room: 'Bedroom One & En-suite', dimensions: '4.2m × 3.4m (13\'9" × 11\'2")' },
      { level: 'Second Floor', room: 'Bedroom Two', dimensions: '3.8m × 3.1m (12\'6" × 10\'2")' }
    ],
    coordinates: { x: 58, y: 36 },
    transport: [
      { station: 'New Islington', line: 'Metrolink', walkMinutes: 3 },
      { station: 'Manchester Piccadilly', line: 'National Rail & Metrolink', walkMinutes: 8 },
      { station: 'Cutting Room Square', line: 'Dining Piazza', walkMinutes: 4 }
    ],
    agent: {
      name: 'Marcus Beaumont',
      role: 'Associate Director · City Centre & Ancoats',
      phone: '+44 (0)161 832 9900',
      email: 'marcus.beaumont@anthonyandco.co.uk',
      branch: 'Ancoats Office, Cutting Room Square, M4'
    }
  },
  {
    id: 'prop-7',
    title: 'Edwardian Period Maisonette near Altrincham Market',
    address: 'Shaw\'s Road, Altrincham, Trafford, WA14 1QU',
    area: 'Altrincham & Hale',
    postcode: 'WA14 1QU',
    listingType: 'sale',
    price: 580000,
    propertyType: 'Maisonette',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1420,
    tenure: 'Share of Freehold',
    epcRating: 'C',
    councilTaxBand: 'Band E',
    featured: false,
    images: [
      periodGeorgianImg,
      sellerLivingImg,
      heroManchesterImg
    ],
    description: 'An expansive three-bedroom Edwardian maisonette directly overlooking the historic cobblestones of Shaw\'s Road, seconds from award-winning Altrincham Market and Stamford Park.',
    longDescription: [
      'Occupying the first and second floors of an elegant Edwardian brick building in the heart of the Old Market Quarter, this maisonette provides over 1,400 sq ft of versatile living space.',
      'The main reception room is bathed in natural light through three tall arched sash windows, complemented by original picture rails and an open fireplace.',
      'A sleek German kitchen is fitted with Corian surfaces and breakfast seating, with three generous bedrooms on the upper level and a private roof terrace.'
    ],
    features: [
      'Private south-facing roof terrace with market canopy views',
      'Three double bedrooms and two modern bathrooms',
      'Share of Freehold with nil ground rent',
      'Directly adjacent to Altrincham Market House and independent delis',
      'Four minutes walk to Altrincham Interchange (Metrolink & Rail)'
    ],
    floorplanRooms: [
      { level: 'First Floor', room: 'Grand Reception Room', dimensions: '6.2m × 4.8m (20\'4" × 15\'9")' },
      { level: 'First Floor', room: 'Kitchen & Dining', dimensions: '4.4m × 3.6m (14\'5" × 11\'10")' },
      { level: 'First Floor', room: 'Roof Terrace', dimensions: '4.0m × 3.2m (13\'1" × 10\'6")' },
      { level: 'Second Floor', room: 'Principal Suite', dimensions: '4.8m × 3.8m (15\'9" × 12\'6")' }
    ],
    coordinates: { x: 34, y: 84 },
    transport: [
      { station: 'Altrincham Interchange', line: 'Metrolink & Mid-Cheshire Rail', walkMinutes: 4 },
      { station: 'Altrincham Market', line: 'Market Quarter', walkMinutes: 1 },
      { station: 'Stamford Park', line: 'Victorian Parkland', walkMinutes: 5 }
    ],
    agent: {
      name: 'Camilla Vance-Lowe',
      role: 'Prime Residential Partner · Altrincham & Hale',
      phone: '+44 (0)161 928 6622',
      email: 'camilla.vance@anthonyandco.co.uk',
      branch: 'Altrincham Office, 14 Shaw\'s Road, WA14'
    }
  },
  {
    id: 'prop-8',
    title: 'Substantial Victorian Residence with Cedar Garden Pavilion',
    address: 'Park Road, Hale, Trafford, WA15 9NW',
    area: 'Altrincham & Hale',
    postcode: 'WA15 9NW',
    listingType: 'sale',
    price: 1450000,
    propertyType: 'Detached Villa',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3450,
    tenure: 'Freehold',
    epcRating: 'C',
    councilTaxBand: 'Band H',
    featured: true,
    images: [
      heroManchesterImg,
      sellerLivingImg,
      gardenFlatImg
    ],
    description: 'A magnificent detached Victorian manor house positioned along prestigious Park Road, enjoying a quarter-acre landscaped plot, four reception rooms, five bedrooms, and an architect-built garden office pavilion.',
    longDescription: [
      'Standing in an enviable position within walking distance of Hale Village, this rare detached home is a benchmark in South Manchester family living.',
      'Grand double front entrance doors open to an impressive reception hall with original balustrade staircase, leading to two formal reception salons with period marble fireplaces.',
      'The kitchen and orangery family room spans the entire rear width, illuminated by a lantern skylight and bi-fold glass doors looking out across manicured lawns to a bespoke cedar-clad home studio pavilion.'
    ],
    features: [
      'Substantial plot spanning over a quarter of an acre',
      'Detached insulated garden office pavilion with high-speed fibre',
      'Five double bedrooms including two comprehensive en-suites',
      'Gated gravel carriage driveway with parking for multiple vehicles',
      'Catchment for Altrincham Grammar School for Boys and Girls'
    ],
    floorplanRooms: [
      { level: 'Ground Floor', room: 'Formal Drawing Room', dimensions: '6.8m × 4.6m (22\'4" × 15\'1")' },
      { level: 'Ground Floor', room: 'Kitchen & Orangery Living', dimensions: '10.2m × 5.4m (33\'6" × 17\'9")' },
      { level: 'Ground Floor', room: 'Formal Dining Salon', dimensions: '5.2m × 4.2m (17\'1" × 13\'9")' },
      { level: 'Garden', room: 'Cedar Studio Pavilion', dimensions: '5.8m × 3.8m (19\'0" × 12\'6")' },
      { level: 'First Floor', room: 'Principal Bedroom Suite', dimensions: '6.0m × 4.6m (19\'8" × 15\'1")' }
    ],
    coordinates: { x: 38, y: 88 },
    transport: [
      { station: 'Hale Station', line: 'Rail to Manchester & Chester', walkMinutes: 6 },
      { station: 'Altrincham Interchange', line: 'Metrolink', walkMinutes: 12 },
      { station: 'Dunham Massey', line: 'National Trust Estate', walkMinutes: 15 }
    ],
    agent: {
      name: 'Camilla Vance-Lowe',
      role: 'Prime Residential Partner · Altrincham & Hale',
      phone: '+44 (0)161 928 6622',
      email: 'camilla.vance@anthonyandco.co.uk',
      branch: 'Altrincham Office, 14 Shaw\'s Road, WA14'
    }
  }
];
