export interface ArchetypeNode {
    id: string;
    name: string;
    description: string;
    tags: string[];
    color: string;
    x: number;
    y: number;
    originalEmbedding?: number[];
}


export const fantasyArchetypesData: ArchetypeNode[] = [{ "name": "The Chosen One", "description": "A seemingly ordinary person destined for extraordinary things, often marked by prophecy or unique abilities", "x": 218.5660552979, "y": 93.6589508057, "tags": ["Harry Potter", "Frodo Baggins", "Paul Atreides"], "color": "#FF5733", "id": "0" }, { "name": "The Wise Mentor", "description": "An elderly sage who guides the hero with wisdom and sometimes magic", "x": 216.2848815918, "y": 145.3287353516, "tags": ["Gandalf", "Dumbledore", "Obi-Wan Kenobi"], "color": "#FF5733", "id": "1" }, { "name": "The Dark Lord", "description": "A powerful evil being seeking domination or destruction of the world", "x": 343.2026672363, "y": 234.1966247559, "tags": ["Sauron", "Voldemort", "The Night King"], "color": "#FF5733", "id": "2" }, { "name": "The Loyal Friend", "description": "A steadfast companion who supports the hero through their journey", "x": 197.546295166, "y": 126.267364502, "tags": ["Samwise Gamgee", "Ron Weasley", "Chewbacca"], "color": "#FF5733", "id": "3" }, { "name": "The Warrior Princess", "description": "A noble woman who defies traditional roles to become a fierce fighter", "x": 245.740447998, "y": 50.0, "tags": ["Eowyn", "Xena", "Wonder Woman"], "color": "#FF5733", "id": "4" }, { "name": "The Trickster", "description": "A clever and mischievous character who creates chaos but sometimes helps the hero", "x": 166.2662963867, "y": 264.9904174805, "tags": ["Loki", "Puck", "Jack Sparrow"], "color": "#FF5733", "id": "5" }, { "name": "The Fallen Hero", "description": "A once-noble character corrupted by power or tragedy", "x": 264.3517456055, "y": 83.8640136719, "tags": ["Anakin Skywalker", "Boromir", "Arthas Menethil"], "color": "#FF5733", "id": "6" }, { "name": "The Royal Heir", "description": "A legitimate or hidden heir to the throne who must reclaim their birthright", "x": 204.5517120361, "y": 59.6754684448, "tags": ["Aragorn", "Daenerys Targaryen", "Simba"], "color": "#FF5733", "id": "7" }, { "name": "The Mysterious Stranger", "description": "A enigmatic figure with unclear motives who appears at crucial moments", "x": 142.6921386719, "y": 269.3865966797, "tags": ["Strider", "Tom Bombadil", "The Man in Black"], "color": "#FF5733", "id": "8" }, { "name": "The Evil Advisor", "description": "A manipulative counselor who poisons the mind of those in power", "x": 293.5388793945, "y": 269.1989135742, "tags": ["Grima Wormtongue", "Jafar", "Littlefinger"], "color": "#FF5733", "id": "9" }, { "name": "The Knight Errant", "description": "A wandering warrior bound by a personal code of honor", "x": 299.1335449219, "y": 91.346572876, "tags": ["The Witcher", "Don Quixote", "The Mandalorian"], "color": "#FF5733", "id": "10" }, { "name": "The Child of Prophecy", "description": "A young person whose birth or existence is tied to an important prediction", "x": 193.6342468262, "y": 85.8962936401, "tags": ["Anakin Skywalker", "Rand al'Thor", "Azor Ahai"], "color": "#FF5733", "id": "11" }, { "name": "The Reluctant Hero", "description": "Someone who initially refuses the call to adventure but eventually accepts their destiny", "x": 229.0170288086, "y": 80.1286392212, "tags": ["Bilbo Baggins", "Neo", "Luke Skywalker"], "color": "#FF5733", "id": "12" }, { "name": "The Wise Woman", "description": "A powerful female figure who provides guidance through magic or wisdom", "x": 232.0320892334, "y": 218.6385955811, "tags": ["Galadriel", "Minerva McGonagall", "Moiraine Damodred"], "color": "#FF5733", "id": "13" }, { "name": "The Beast Master", "description": "A character with a special connection to animals or magical creatures", "x": 175.105682373, "y": 163.0348510742, "tags": ["Hagrid", "Daine Sarrasri", "Eliza Thornberry"], "color": "#FF5733", "id": "14" }, { "name": "The Dark Witch", "description": "A malevolent female magic user who often serves as an antagonist", "x": 314.8571166992, "y": 253.1897125244, "tags": ["Bellatrix Lestrange", "The White Witch", "Maleficent"], "color": "#FF5733", "id": "15" }, { "name": "The Scholar Mage", "description": "A studious magic user who relies on knowledge and research", "x": 175.593170166, "y": 214.9264984131, "tags": ["Hermione Granger", "Raistlin Majere", "Doctor Strange"], "color": "#FF5733", "id": "16" }, { "name": "The Cursed One", "description": "A character suffering from a magical affliction or transformation", "x": 314.2824707031, "y": 178.6775054932, "tags": ["Beast", "Edward Scissorhands", "The Hulk"], "color": "#FF5733", "id": "17" }, { "name": "The Wild Child", "description": "A character raised away from civilization, often by animals or magical beings", "x": 144.0669708252, "y": 162.3541564941, "tags": ["Mowgli", "Tarzan", "Peter Pan"], "color": "#FF5733", "id": "18" }, { "name": "The Dragon Rider", "description": "A warrior who shares a special bond with a dragon mount", "x": 179.655456543, "y": 90.7490539551, "tags": ["Eragon", "Daenerys Targaryen", "Hiccup"], "color": "#FF5733", "id": "19" }, { "name": "The Shadow Assassin", "description": "A deadly killer who operates from the shadows, often with magical abilities", "x": 282.3618774414, "y": 248.5007629395, "tags": ["Artemis Entreri", "Grey Worm", "Azrael"], "color": "#FF5733", "id": "20" }, { "name": "The Gentle Giant", "description": "A physically imposing character with a kind and peaceful nature", "x": 191.8167724609, "y": 152.2978057861, "tags": ["Hodor", "Hagrid", "The BFG"], "color": "#FF5733", "id": "21" }, { "name": "The Lost Prince", "description": "A royal child separated from their heritage who must discover their true identity", "x": 217.2685699463, "y": 50.7092628479, "tags": ["Arthur Pendragon", "Jon Snow", "Perseus"], "color": "#FF5733", "id": "22" }, { "name": "The Forest Guardian", "description": "A mystical protector of nature and wildlife", "x": 172.8095245361, "y": 133.8649597168, "tags": ["Radagast", "Pocahontas", "The Lorax"], "color": "#FF5733", "id": "23" }, { "name": "The Battle Mage", "description": "A warrior who combines martial prowess with magical abilities", "x": 167.470489502, "y": 193.5250091553, "tags": ["Gandalf", "Elminster", "Doctor Strange"], "color": "#FF5733", "id": "24" }, { "name": "The Shapeshifter", "description": "A being capable of changing their physical form at will", "x": 204.9894714355, "y": 272.0228881836, "tags": ["Mystique", "Beorn", "Professor McGonagall"], "color": "#FF5733", "id": "25" }, { "name": "The Prophecy Keeper", "description": "A character who maintains and interprets important predictions about the future", "x": 235.6864624023, "y": 173.634262085, "tags": ["Trelawney", "The Oracle", "Melisandre"], "color": "#FF5733", "id": "26" }, { "name": "The Dark Knight", "description": "A warrior who uses questionable methods to achieve noble goals", "x": 309.7498168945, "y": 111.6669921875, "tags": ["Geralt of Rivia", "Batman", "The Punisher"], "color": "#FF5733", "id": "27" }, { "name": "The Fairy Godmother", "description": "A benevolent magical being who helps those in need", "x": 224.9034881592, "y": 234.0593566895, "tags": ["Cinderella's Godmother", "The Blue Fairy", "Flora, Fauna, and Merryweather"], "color": "#FF5733", "id": "28" }, { "name": "The Cursed King", "description": "A ruler suffering from a magical affliction that affects their kingdom", "x": 335.6951293945, "y": 183.0847320557, "tags": ["Beast", "Fisher King", "Theoden"], "color": "#FF5733", "id": "29" }, { "name": "The Wild Mage", "description": "A magic user whose powers are unpredictable and tied to nature", "x": 136.1648101807, "y": 195.5142669678, "tags": ["Daine Sarrasri", "Merlin", "Storm"], "color": "#FF5733", "id": "30" }, { "name": "The Immortal Being", "description": "A character who cannot die and has lived through countless ages", "x": 265.2870788574, "y": 119.1040267944, "tags": ["Wolverine", "Elrond", "Vandal Savage"], "color": "#FF5733", "id": "31" }, { "name": "The Elemental Master", "description": "A magic user who specializes in controlling one or more natural elements", "x": 104.6075057983, "y": 177.9459533691, "tags": ["Avatar Aang", "Storm", "Toph Beifong"], "color": "#FF5733", "id": "32" }, { "name": "The Sacred Knight", "description": "A warrior devoted to a religious or spiritual cause", "x": 311.8178710938, "y": 80.6584014893, "tags": ["Galahad", "Templars", "Paladins"], "color": "#FF5733", "id": "33" }, { "name": "The Rebel Leader", "description": "A charismatic figure who leads the resistance against tyranny", "x": 232.8185424805, "y": 66.5888366699, "tags": ["Princess Leia", "Katniss Everdeen", "Robin Hood"], "color": "#FF5733", "id": "34" }, { "name": "The Blood Mage", "description": "A practitioner of forbidden magic that requires life force or sacrifice", "x": 268.3757629395, "y": 230.4608612061, "tags": ["Morgana", "Flemeth", "Blood Raven"], "color": "#FF5733", "id": "35" }, { "name": "The Beast Slayer", "description": "A specialized warrior who hunts dangerous monsters", "x": 307.7963256836, "y": 174.2710418701, "tags": ["Van Helsing", "Beowulf", "Monster Hunter"], "color": "#FF5733", "id": "36" }, { "name": "The Corrupted Priest", "description": "A religious figure who has fallen to darkness or evil", "x": 268.9983520508, "y": 187.6210632324, "tags": ["High Sparrow", "Claude Frollo", "Melisandre"], "color": "#FF5733", "id": "37" }, { "name": "The Dream Walker", "description": "Someone who can enter and manipulate dreams", "x": 134.1853790283, "y": 330.3759155273, "tags": ["Morpheus", "Freddy Krueger", "Dream"], "color": "#FF5733", "id": "38" }, { "name": "The Spirit Medium", "description": "A person who can communicate with the dead or spirit world", "x": 120.1784820557, "y": 261.6329956055, "tags": ["John Constantine", "Cole Sear", "Luna Lovegood"], "color": "#FF5733", "id": "39" }, { "name": "The Enchantress", "description": "A female magic user who specializes in charm and illusion magic", "x": 237.3942871094, "y": 246.7218170166, "tags": ["Circe", "Morgan Le Fay", "The White Witch"], "color": "#FF5733", "id": "40" }, { "name": "The Time Manipulator", "description": "A character who can control or travel through time", "x": 164.7047119141, "y": 291.5953979492, "tags": ["Doctor Strange", "Hermione (with Time-Turner)", "The Doctor"], "color": "#FF5733", "id": "41" }, { "name": "The Soul Collector", "description": "A being who harvests or trades in souls", "x": 186.561126709, "y": 318.3096923828, "tags": ["Mephisto", "Hades", "Death"], "color": "#FF5733", "id": "42" }, { "name": "The Hidden Guardian", "description": "A protector who works in secret to maintain balance or safety", "x": 202.3938293457, "y": 185.3256072998, "tags": ["Nick Fury", "The Watchers", "Men in Black"], "color": "#FF5733", "id": "43" }, { "name": "The Puppet Master", "description": "A manipulative character who controls others from behind the scenes", "x": 270.1156311035, "y": 281.9112548828, "tags": ["Littlefinger", "Emperor Palpatine", "Varys"], "color": "#FF5733", "id": "44" }, { "name": "The War Chief", "description": "A leader who excels in military strategy and combat", "x": 260.1105957031, "y": 64.4695892334, "tags": ["Aragorn", "Theoden", "Leonidas"], "color": "#FF5733", "id": "45" }, { "name": "The Witch Hunter", "description": "A specialist trained to track and eliminate magical threats", "x": 297.3025512695, "y": 189.0743255615, "tags": ["Solomon Kane", "Hansel", "Van Helsing"], "color": "#FF5733", "id": "46" }, { "name": "The Rogue Wizard", "description": "A magic user who operates outside traditional magical society", "x": 160.4831237793, "y": 235.9141235352, "tags": ["Harry Dresden", "John Constantine", "Doctor Strange"], "color": "#FF5733", "id": "47" }, { "name": "The Cursed Warrior", "description": "A fighter bearing a supernatural burden or curse", "x": 305.0236816406, "y": 135.1115722656, "tags": ["Ghost Rider", "Prince Ashitaka", "The Punisher"], "color": "#FF5733", "id": "48" }, { "name": "The Divine Champion", "description": "A mortal chosen by the gods to carry out their will", "x": 131.4893188477, "y": 118.6195907593, "tags": ["Perseus", "Wonder Woman", "Thor"], "color": "#FF5733", "id": "49" }, { "name": "The Shadow Queen", "description": "A female ruler who uses dark magic to maintain power", "x": 312.5499267578, "y": 242.4575042725, "tags": ["Evil Queen", "Ravenna", "Queen Bavmorda"], "color": "#FF5733", "id": "50" }, { "name": "The Nature Spirit", "description": "A magical being embodying natural forces", "x": 118.0346984863, "y": 183.3952178955, "tags": ["Totoro", "Pan", "Dryads"], "color": "#FF5733", "id": "51" }, { "name": "The Dimensional Traveler", "description": "A character who can move between different worlds or realities", "x": 128.4854431152, "y": 302.3070068359, "tags": ["Doctor Strange", "The Doctor", "Philip Pullman's Will"], "color": "#FF5733", "id": "52" }, { "name": "The Cursed Lover", "description": "A character whose love is complicated by a magical affliction", "x": 311.2727050781, "y": 195.8330078125, "tags": ["Beast", "Edward Cullen", "Ladyhawke"], "color": "#FF5733", "id": "53" }, { "name": "The Blood Hunter", "description": "A tracker who specializes in hunting vampires or other blood-drinking creatures", "x": 303.380859375, "y": 206.5812225342, "tags": ["Blade", "Van Helsing", "Buffy Summers"], "color": "#FF5733", "id": "54" }, { "name": "The Celestial Being", "description": "A powerful entity from the heavens or cosmic realm", "x": 102.7868423462, "y": 145.2703552246, "tags": ["Thor", "Gandalf", "The Silver Surfer"], "color": "#FF5733", "id": "55" }, { "name": "The Chaos Agent", "description": "A character who deliberately creates disorder for their own purposes", "x": 162.497833252, "y": 260.2475585938, "tags": ["Loki", "Q", "The Joker"], "color": "#FF5733", "id": "56" }, { "name": "The Dream Weaver", "description": "A magic user who can create and manipulate illusions", "x": 148.5202026367, "y": 339.4489746094, "tags": ["Morpheus", "Sandman", "Inception's Architects"], "color": "#FF5733", "id": "57" }, { "name": "The Soul Knight", "description": "A warrior who protects the spiritual realm", "x": 321.8147583008, "y": 115.9508666992, "tags": ["Ghost Rider", "Spawn", "Constantine"], "color": "#FF5733", "id": "58" }, { "name": "The Storm Bringer", "description": "A being capable of controlling weather and atmospheric conditions", "x": 97.7696228027, "y": 153.439453125, "tags": ["Storm", "Thor", "Zeus"], "color": "#FF5733", "id": "59" }, { "name": "The Blood Queen", "description": "A female ruler who maintains power through blood magic or sacrifice", "x": 317.8590087891, "y": 231.9524383545, "tags": ["Elizabeth Bathory", "Queen of Hearts", "Crimson Queen"], "color": "#FF5733", "id": "60" }, { "name": "The Void Walker", "description": "A character who can traverse or manipulate the empty spaces between realms", "x": 105.0753860474, "y": 298.8676147461, "tags": ["Doctor Strange", "Nightcrawler", "Portal's Chell"], "color": "#FF5733", "id": "61" }, { "name": "The Summoner", "description": "A magic user who specializes in calling forth creatures or spirits", "x": 136.1374816895, "y": 212.8395843506, "tags": ["Yuna", "Rita Repulsa", "Pokemon Trainers"], "color": "#FF5733", "id": "62" }, { "name": "The Living Weapon", "description": "A person transformed into a weapon through magic or other means", "x": 221.0505981445, "y": 284.3971557617, "tags": ["Winter Soldier", "Wolverine", "Edward Scissorhands"], "color": "#FF5733", "id": "63" }, { "name": "The Star Child", "description": "A being of cosmic origin in human form", "x": 118.3366622925, "y": 131.3328857422, "tags": ["Superman", "Starman", "Star-Lord"], "color": "#FF5733", "id": "64" }, { "name": "The Witch King", "description": "A male ruler who combines magical power with political authority", "x": 350.0, "y": 226.5062103271, "tags": ["Witch-king of Angmar", "The Lich King", "The Night King"], "color": "#FF5733", "id": "65" }, { "name": "The Memory Keeper", "description": "A character who preserves or manipulates memories", "x": 221.7975311279, "y": 201.3901367188, "tags": ["Dumbledore", "The Giver", "Memory Monks"], "color": "#FF5733", "id": "66" }, { "name": "The Plague Doctor", "description": "A healer who deals with magical diseases and curses", "x": 197.5186767578, "y": 224.8429260254, "tags": ["Madam Pomfrey", "Doctor Strange", "Elrond"], "color": "#FF5733", "id": "67" }, { "name": "The Eternal Champion", "description": "A warrior who is continuously reborn to fight evil across different ages", "x": 271.7469787598, "y": 100.0413208008, "tags": ["Link", "Michael Moorcock's Eternal Champion", "The Avatar"], "color": "#FF5733", "id": "68" }, { "name": "The Tomb Raider", "description": "An adventurer who explores ancient magical ruins and artifacts", "x": 227.5024261475, "y": 114.1574707031, "tags": ["Indiana Jones", "Lara Croft", "Nathan Drake"], "color": "#FF5733", "id": "69" }, { "name": "The Gatekeeper", "description": "A guardian who protects portals between worlds or realms", "x": 202.1027984619, "y": 168.6817932129, "tags": ["Heimdall", "The Guardian of Forever", "Hodor"], "color": "#FF5733", "id": "70" }, { "name": "The Cosmic Horror", "description": "An ancient being whose very existence threatens reality", "x": 75.0, "y": 220.222869873, "tags": ["Cthulhu", "The Other Gods", "The Nothing"], "color": "#FF5733", "id": "71" }, { "name": "The Undying King", "description": "A ruler who has achieved immortality through dark means", "x": 349.748260498, "y": 205.879776001, "tags": ["The Lich King", "Nagash", "The Night King"], "color": "#FF5733", "id": "72" }, { "name": "The World Walker", "description": "A traveler who moves between different planes of existence", "x": 119.0167922974, "y": 308.2847595215, "tags": ["Rincewind", "Lyra Belacqua", "Richard Cypher"], "color": "#FF5733", "id": "73" }, { "name": "The Chaos Mage", "description": "A spellcaster who harnesses unpredictable, wild magic", "x": 156.0379333496, "y": 227.1935577393, "tags": ["Rincewind", "Willow", "Wanda Maximoff"], "color": "#FF5733", "id": "74" }, { "name": "The Dream Lord", "description": "A powerful being who rules over the realm of dreams", "x": 125.4868927002, "y": 350.0, "tags": ["Morpheus", "The Sandman", "Hypnos"], "color": "#FF5733", "id": "75" }, { "name": "The Soul Weaver", "description": "A magic user who can manipulate the essence of life itself", "x": 178.253112793, "y": 326.409942627, "tags": ["Doctor Facilier", "Shang Tsung", "Death"], "color": "#FF5733", "id": "76" }, { "name": "The Forgotten God", "description": "A deity who has lost most of their worshippers and power", "x": 77.0024795532, "y": 195.2283630371, "tags": ["Wednesday", "Pan", "The Old Gods"], "color": "#FF5733", "id": "77" }, { "name": "The Rune Master", "description": "A scholar who derives power from ancient magical symbols", "x": 179.6587524414, "y": 200.6986999512, "tags": ["Elminster", "Doctor Strange", "Gandalf"], "color": "#FF5733", "id": "78" }, { "name": "The Living Legend", "description": "A hero whose deeds have become mythological in their own lifetime", "x": 254.5330657959, "y": 109.6379776001, "tags": ["Drizzt Do'Urden", "Conan", "King Arthur"], "color": "#FF5733", "id": "79" }, { "name": "The Death Knight", "description": "A fallen warrior resurrected to serve dark powers", "x": 330.9916381836, "y": 139.0960693359, "tags": ["Arthas", "Lord Soth", "The Nazg\u00fbl"], "color": "#FF5733", "id": "80" }, { "name": "The Spell Thief", "description": "A character who can steal or copy others' magical abilities", "x": 191.1448974609, "y": 284.9484863281, "tags": ["Rogue", "Sylar", "Peter Petrelli"], "color": "#FF5733", "id": "81" }, { "name": "The Living Prophecy", "description": "A person whose very existence fulfills an ancient prediction", "x": 208.2136383057, "y": 91.4080200195, "tags": ["Neo", "John Connor", "Anakin Skywalker"], "color": "#FF5733", "id": "82" }, { "name": "The Cosmic Trickster", "description": "A powerful being who uses chaos and mischief to test heroes", "x": 143.0363616943, "y": 268.3032836914, "tags": ["Q", "Mr. Mxyzptlk", "Coyote"], "color": "#FF5733", "id": "83" }, { "name": "The Spirit Walker", "description": "A shaman who can journey through the spirit world", "x": 105.8817825317, "y": 277.6440734863, "tags": ["Aang", "John Constantine", "Doctor Strange"], "color": "#FF5733", "id": "84" }, { "name": "The Cursed Prophet", "description": "A seer whose predictions are true but never believed", "x": 254.8762817383, "y": 171.0225524902, "tags": ["Cassandra", "Trelawney", "The Oracle"], "color": "#FF5733", "id": "85" }, { "name": "The Elemental Lord", "description": "A being who embodies and controls a force of nature", "x": 85.348449707, "y": 164.1797790527, "tags": ["Poseidon", "Gaia", "Mother Nature"], "color": "#FF5733", "id": "86" }, { "name": "The Void Lord", "description": "A entity seeking to consume or nullify existence itself", "x": 77.6433868408, "y": 267.4666748047, "tags": ["Dormammu", "The Nothing", "Anti-Monitor"], "color": "#FF5733", "id": "87" }]

// x = Evil -> Good, y = External -> Internal
export const fantasyArchetypesDataOnEvilVSGoodExternalVSInternal: ArchetypeNode[] =

    [{
        'name': 'The Chosen One',
        'x': 0.06355758333341323,
        'y': 0.0017502784617984823,
        'color': '#FF5733',
        'id': '0',
        'tags': ['Harry Potter', 'Frodo Baggins', 'Paul Atreides'],
        'description': 'A seemingly ordinary person destined for extraordinary things, often marked by prophecy or unique abilities'
    },
    {
        'name': 'The Wise Mentor',
        'x': 0.05604484069852397,
        'y': -0.005358354340781968,
        'color': '#FF5733',
        'id': '1',
        'tags': ['Gandalf', 'Dumbledore', 'Obi-Wan Kenobi'],
        'description': 'An elderly sage who guides the hero with wisdom and sometimes magic'
    },
    {
        'name': 'The Dark Lord',
        'x': -0.14235666877314693,
        'y': -0.002577828253838413,
        'color': '#FF5733',
        'id': '2',
        'tags': ['Sauron', 'Voldemort', 'The Night King'],
        'description': 'A powerful evil being seeking domination or destruction of the world'
    },
    {
        'name': 'The Loyal Friend',
        'x': 0.08553183147416892,
        'y': 0.008886625353256516,
        'color': '#FF5733',
        'id': '3',
        'tags': ['Samwise Gamgee', 'Ron Weasley', 'Chewbacca'],
        'description': 'A steadfast companion who supports the hero through their journey'
    },
    {
        'name': 'The Warrior Princess',
        'x': 0.03622651329512397,
        'y': -0.018293011389816802,
        'color': '#FF5733',
        'id': '4',
        'tags': ['Eowyn', 'Xena', 'Wonder Woman'],
        'description': 'A noble woman who defies traditional roles to become a fierce fighter'
    },
    {
        'name': 'The Trickster',
        'x': -0.03810074541920638,
        'y': 0.010078165504601125,
        'color': '#FF5733',
        'id': '5',
        'tags': ['Loki', 'Puck', 'Jack Sparrow'],
        'description': 'A clever and mischievous character who creates chaos but sometimes helps the hero'
    },
    {
        'name': 'The Fallen Hero',
        'x': -0.012224586982153646,
        'y': 0.0003037443183306898,
        'color': '#FF5733',
        'id': '6',
        'tags': ['Anakin Skywalker', 'Boromir', 'Arthas Menethil'],
        'description': 'A once-noble character corrupted by power or tragedy'
    },
    {
        'name': 'The Royal Heir',
        'x': 0.023783879180895834,
        'y': -0.035665793063000606,
        'color': '#FF5733',
        'id': '7',
        'tags': ['Aragorn', 'Daenerys Targaryen', 'Simba'],
        'description': 'A legitimate or hidden heir to the throne who must reclaim their birthright'
    },
    {
        'name': 'The Mysterious Stranger',
        'x': -0.01345370366851563,
        'y': -0.013341209868466153,
        'color': '#FF5733',
        'id': '8',
        'tags': ['Strider', 'Tom Bombadil', 'The Man in Black'],
        'description': 'A enigmatic figure with unclear motives who appears at crucial moments'
    },
    {
        'name': 'The Evil Advisor',
        'x': -0.10232113850827088,
        'y': 0.004744667710377987,
        'color': '#FF5733',
        'id': '9',
        'tags': ['Grima Wormtongue', 'Jafar', 'Littlefinger'],
        'description': 'A manipulative counselor who poisons the mind of those in power'
    },
    {
        'name': 'The Knight Errant',
        'x': 0.0519595365105906,
        'y': -0.00918389913022824,
        'color': '#FF5733',
        'id': '10',
        'tags': ['The Witcher', 'Don Quixote', 'The Mandalorian'],
        'description': 'A wandering warrior bound by a personal code of honor'
    },
    {
        'name': 'The Child of Prophecy',
        'x': 0.02625811165437522,
        'y': -0.003716154686886297,
        'color': '#FF5733',
        'id': '11',
        'tags': ['Anakin Skywalker', "Rand al'Thor", 'Azor Ahai'],
        'description': 'A young person whose birth or existence is tied to an important prediction'
    },
    {
        'name': 'The Reluctant Hero',
        'x': 0.05086905058990346,
        'y': -0.019312686818951458,
        'color': '#FF5733',
        'id': '12',
        'tags': ['Bilbo Baggins', 'Neo', 'Luke Skywalker'],
        'description': 'Someone who initially refuses the call to adventure but eventually accepts their destiny'
    },
    {
        'name': 'The Wise Woman',
        'x': 0.032644367969694,
        'y': -0.015900876075780584,
        'color': '#FF5733',
        'id': '13',
        'tags': ['Galadriel', 'Minerva McGonagall', 'Moiraine Damodred'],
        'description': 'A powerful female figure who provides guidance through magic or wisdom'
    },
    {
        'name': 'The Beast Master',
        'x': -0.00858177207477423,
        'y': -0.0091707985267655,
        'color': '#FF5733',
        'id': '14',
        'tags': ['Hagrid', 'Daine Sarrasri', 'Eliza Thornberry'],
        'description': 'A character with a special connection to animals or magical creatures'
    },
    {
        'name': 'The Dark Witch',
        'x': -0.1325013767896217,
        'y': -0.008654826993265821,
        'color': '#FF5733',
        'id': '15',
        'tags': ['Bellatrix Lestrange', 'The White Witch', 'Maleficent'],
        'description': 'A malevolent female magic user who often serves as an antagonist'
    },
    {
        'name': 'The Scholar Mage',
        'x': 0.042581542716118456,
        'y': 0.013787523580351999,
        'color': '#FF5733',
        'id': '16',
        'tags': ['Hermione Granger', 'Raistlin Majere', 'Doctor Strange'],
        'description': 'A studious magic user who relies on knowledge and research'
    },
    {
        'name': 'The Cursed One',
        'x': -0.07075987122540309,
        'y': 0.038931659549565206,
        'color': '#FF5733',
        'id': '17',
        'tags': ['Beast', 'Edward Scissorhands', 'The Hulk'],
        'description': 'A character suffering from a magical affliction or transformation'
    },
    {
        'name': 'The Wild Child',
        'x': -0.007648426955250559,
        'y': -0.0427260995788222,
        'color': '#FF5733',
        'id': '18',
        'tags': ['Mowgli', 'Tarzan', 'Peter Pan'],
        'description': 'A character raised away from civilization, often by animals or magical beings'
    },
    {
        'name': 'The Dragon Rider',
        'x': 0.03636028080816475,
        'y': 0.01528393208432352,
        'color': '#FF5733',
        'id': '19',
        'tags': ['Eragon', 'Daenerys Targaryen', 'Hiccup'],
        'description': 'A warrior who shares a special bond with a dragon mount'
    },
    {
        'name': 'The Shadow Assassin',
        'x': -0.07158781520058444,
        'y': -0.010325018504293945,
        'color': '#FF5733',
        'id': '20',
        'tags': ['Artemis Entreri', 'Grey Worm', 'Azrael'],
        'description': 'A deadly killer who operates from the shadows, often with magical abilities'
    },
    {
        'name': 'The Gentle Giant',
        'x': 0.0636366660468404,
        'y': -0.006214261906456256,
        'color': '#FF5733',
        'id': '21',
        'tags': ['Hodor', 'Hagrid', 'The BFG'],
        'description': 'A physically imposing character with a kind and peaceful nature'
    },
    {
        'name': 'The Lost Prince',
        'x': 0.01574961036947488,
        'y': -0.05016308026841604,
        'color': '#FF5733',
        'id': '22',
        'tags': ['Arthur Pendragon', 'Jon Snow', 'Perseus'],
        'description': 'A royal child separated from their heritage who must discover their true identity'
    },
    {
        'name': 'The Forest Guardian',
        'x': 0.030821729232195644,
        'y': -0.03449403492193853,
        'color': '#FF5733',
        'id': '23',
        'tags': ['Radagast', 'Pocahontas', 'The Lorax'],
        'description': 'A mystical protector of nature and wildlife'
    },
    {
        'name': 'The Battle Mage',
        'x': 0.0008628817430037655,
        'y': 0.02173494042496449,
        'color': '#FF5733',
        'id': '24',
        'tags': ['Gandalf', 'Elminster', 'Doctor Strange'],
        'description': 'A warrior who combines martial prowess with magical abilities'
    },
    {
        'name': 'The Shapeshifter',
        'x': -0.012996410735850228,
        'y': -0.02045992406417621,
        'color': '#FF5733',
        'id': '25',
        'tags': ['Mystique', 'Beorn', 'Professor McGonagall'],
        'description': 'A being capable of changing their physical form at will'
    },
    {
        'name': 'The Prophecy Keeper',
        'x': 0.03661802752424145,
        'y': 0.010057482318254984,
        'color': '#FF5733',
        'id': '26',
        'tags': ['Trelawney', 'The Oracle', 'Melisandre'],
        'description': 'A character who maintains and interprets important predictions about the future'
    },
    {
        'name': 'The Dark Knight',
        'x': -0.004332087449682859,
        'y': 0.0160818447895862,
        'color': '#FF5733',
        'id': '27',
        'tags': ['Geralt of Rivia', 'Batman', 'The Punisher'],
        'description': 'A warrior who uses questionable methods to achieve noble goals'
    },
    {
        'name': 'The Fairy Godmother',
        'x': 0.05257706946691362,
        'y': 0.015794754918756357,
        'color': '#FF5733',
        'id': '28',
        'tags': ["Cinderella's Godmother",
            'The Blue Fairy',
            'Flora, Fauna, and Merryweather'],
        'description': 'A benevolent magical being who helps those in need'
    },
    {
        'name': 'The Cursed King',
        'x': -0.07457114607317812,
        'y': 0.038710212479795655,
        'color': '#FF5733',
        'id': '29',
        'tags': ['Beast', 'Fisher King', 'Theoden'],
        'description': 'A ruler suffering from a magical affliction that affects their kingdom'
    },
    {
        'name': 'The Wild Mage',
        'x': -0.019001497187759606,
        'y': -0.036653096496506166,
        'color': '#FF5733',
        'id': '30',
        'tags': ['Daine Sarrasri', 'Merlin', 'Storm'],
        'description': 'A magic user whose powers are unpredictable and tied to nature'
    },
    {
        'name': 'The Immortal Being',
        'x': 0.012476983498614175,
        'y': -0.04791712015567065,
        'color': '#FF5733',
        'id': '31',
        'tags': ['Wolverine', 'Elrond', 'Vandal Savage'],
        'description': 'A character who cannot die and has lived through countless ages'
    },
    {
        'name': 'The Elemental Master',
        'x': -5.041068839192753e-05,
        'y': -0.01701406583152086,
        'color': '#FF5733',
        'id': '32',
        'tags': ['Avatar Aang', 'Storm', 'Toph Beifong'],
        'description': 'A magic user who specializes in controlling one or more natural elements'
    },
    {
        'name': 'The Sacred Knight',
        'x': 0.08357596462088776,
        'y': 0.009876189200455826,
        'color': '#FF5733',
        'id': '33',
        'tags': ['Galahad', 'Templars', 'Paladins'],
        'description': 'A warrior devoted to a religious or spiritual cause'
    },
    {
        'name': 'The Rebel Leader',
        'x': -0.012148535504743513,
        'y': -0.037487590425632406,
        'color': '#FF5733',
        'id': '34',
        'tags': ['Princess Leia', 'Katniss Everdeen', 'Robin Hood'],
        'description': 'A charismatic figure who leads the resistance against tyranny'
    },
    {
        'name': 'The Blood Mage',
        'x': -0.026021121303973715,
        'y': -0.01406504686742796,
        'color': '#FF5733',
        'id': '35',
        'tags': ['Morgana', 'Flemeth', 'Blood Raven'],
        'description': 'A practitioner of forbidden magic that requires life force or sacrifice'
    },
    {
        'name': 'The Beast Slayer',
        'x': -0.033089182010475005,
        'y': 0.021650054860131718,
        'color': '#FF5733',
        'id': '36',
        'tags': ['Van Helsing', 'Beowulf', 'Monster Hunter'],
        'description': 'A specialized warrior who hunts dangerous monsters'
    },
    {
        'name': 'The Corrupted Priest',
        'x': -0.07510497927162427,
        'y': 0.012792785501358997,
        'color': '#FF5733',
        'id': '37',
        'tags': ['High Sparrow', 'Claude Frollo', 'Melisandre'],
        'description': 'A religious figure who has fallen to darkness or evil'
    },
    {
        'name': 'The Dream Walker',
        'x': -0.022137633765787104,
        'y': -0.0031561558200246254,
        'color': '#FF5733',
        'id': '38',
        'tags': ['Morpheus', 'Freddy Krueger', 'Dream'],
        'description': 'Someone who can enter and manipulate dreams'
    },
    {
        'name': 'The Spirit Medium',
        'x': 0.028409390178545033,
        'y': -0.00788497186849417,
        'color': '#FF5733',
        'id': '39',
        'tags': ['John Constantine', 'Cole Sear', 'Luna Lovegood'],
        'description': 'A person who can communicate with the dead or spirit world'
    },
    {
        'name': 'The Enchantress',
        'x': -0.03744476763765174,
        'y': 0.0029037801375518812,
        'color': '#FF5733',
        'id': '40',
        'tags': ['Circe', 'Morgan Le Fay', 'The White Witch'],
        'description': 'A female magic user who specializes in charm and illusion magic'
    },
    {
        'name': 'The Time Manipulator',
        'x': -0.027790756562951963,
        'y': 0.0027865037034595502,
        'color': '#FF5733',
        'id': '41',
        'tags': ['Doctor Strange', 'Hermione (with Time-Turner)', 'The Doctor'],
        'description': 'A character who can control or travel through time'
    },
    {
        'name': 'The Soul Collector',
        'x': 0.004318151424143768,
        'y': -0.019225649672561518,
        'color': '#FF5733',
        'id': '42',
        'tags': ['Mephisto', 'Hades', 'Death'],
        'description': 'A being who harvests or trades in souls'
    },
    {
        'name': 'The Hidden Guardian',
        'x': 0.041475329410973566,
        'y': -0.005793272968698707,
        'color': '#FF5733',
        'id': '43',
        'tags': ['Nick Fury', 'The Watchers', 'Men in Black'],
        'description': 'A protector who works in secret to maintain balance or safety'
    },
    {
        'name': 'The Puppet Master',
        'x': -0.08815366618132868,
        'y': -0.004228420266959659,
        'color': '#FF5733',
        'id': '44',
        'tags': ['Littlefinger', 'Emperor Palpatine', 'Varys'],
        'description': 'A manipulative character who controls others from behind the scenes'
    },
    {
        'name': 'The War Chief',
        'x': 0.015512123205629738,
        'y': 0.01082978728478022,
        'color': '#FF5733',
        'id': '45',
        'tags': ['Aragorn', 'Theoden', 'Leonidas'],
        'description': 'A leader who excels in military strategy and combat'
    },
    {
        'name': 'The Witch Hunter',
        'x': -0.03585988748844052,
        'y': 0.01684698318581697,
        'color': '#FF5733',
        'id': '46',
        'tags': ['Solomon Kane', 'Hansel', 'Van Helsing'],
        'description': 'A specialist trained to track and eliminate magical threats'
    },
    {
        'name': 'The Rogue Wizard',
        'x': -0.03831424323847081,
        'y': -0.014794512171449795,
        'color': '#FF5733',
        'id': '47',
        'tags': ['Harry Dresden', 'John Constantine', 'Doctor Strange'],
        'description': 'A magic user who operates outside traditional magical society'
    },
    {
        'name': 'The Cursed Warrior',
        'x': -0.0470454001121092,
        'y': 0.0321378058372008,
        'color': '#FF5733',
        'id': '48',
        'tags': ['Ghost Rider', 'Prince Ashitaka', 'The Punisher'],
        'description': 'A fighter bearing a supernatural burden or curse'
    },
    {
        'name': 'The Divine Champion',
        'x': 0.0448365936867238,
        'y': 0.008076500570542544,
        'color': '#FF5733',
        'id': '49',
        'tags': ['Perseus', 'Wonder Woman', 'Thor'],
        'description': 'A mortal chosen by the gods to carry out their will'
    },
    {
        'name': 'The Shadow Queen',
        'x': -0.08190835664283705,
        'y': -0.008124260084002369,
        'color': '#FF5733',
        'id': '50',
        'tags': ['Evil Queen', 'Ravenna', 'Queen Bavmorda'],
        'description': 'A female ruler who uses dark magic to maintain power'
    },
    {
        'name': 'The Nature Spirit',
        'x': 0.03496844652380758,
        'y': -0.06788228075979885,
        'color': '#FF5733',
        'id': '51',
        'tags': ['Totoro', 'Pan', 'Dryads'],
        'description': 'A magical being embodying natural forces'
    },
    {
        'name': 'The Dimensional Traveler',
        'x': 0.012823216284204506,
        'y': -0.009040652118650572,
        'color': '#FF5733',
        'id': '52',
        'tags': ['Doctor Strange', 'The Doctor', "Philip Pullman's Will"],
        'description': 'A character who can move between different worlds or realities'
    },
    {
        'name': 'The Cursed Lover',
        'x': -0.06628999121851026,
        'y': 0.04252667654606897,
        'color': '#FF5733',
        'id': '53',
        'tags': ['Beast', 'Edward Cullen', 'Ladyhawke'],
        'description': 'A character whose love is complicated by a magical affliction'
    },
    {
        'name': 'The Blood Hunter',
        'x': -0.031906619784903056,
        'y': -0.008687939039435252,
        'color': '#FF5733',
        'id': '54',
        'tags': ['Blade', 'Van Helsing', 'Buffy Summers'],
        'description': 'A tracker who specializes in hunting vampires or other blood-drinking creatures'
    },
    {
        'name': 'The Celestial Being',
        'x': 0.012668738542990304,
        'y': -0.01327905533441176,
        'color': '#FF5733',
        'id': '55',
        'tags': ['Thor', 'Gandalf', 'The Silver Surfer'],
        'description': 'A powerful entity from the heavens or cosmic realm'
    },
    {
        'name': 'The Chaos Agent',
        'x': -0.07459574394345286,
        'y': -0.019667415262202684,
        'color': '#FF5733',
        'id': '56',
        'tags': ['Loki', 'Q', 'The Joker'],
        'description': 'A character who deliberately creates disorder for their own purposes'
    },
    {
        'name': 'The Dream Weaver',
        'x': -0.02066322001364143,
        'y': 0.004143616367450337,
        'color': '#FF5733',
        'id': '57',
        'tags': ['Morpheus', 'Sandman', "Inception's Architects"],
        'description': 'A magic user who can create and manipulate illusions'
    },
    {
        'name': 'The Soul Knight',
        'x': 0.05023264024584492,
        'y': -0.02489826597598606,
        'color': '#FF5733',
        'id': '58',
        'tags': ['Ghost Rider', 'Spawn', 'Constantine'],
        'description': 'A warrior who protects the spiritual realm'
    },
    {
        'name': 'The Storm Bringer',
        'x': -0.009319541819813856,
        'y': 0.012697603855615344,
        'color': '#FF5733',
        'id': '59',
        'tags': ['Storm', 'Thor', 'Zeus'],
        'description': 'A being capable of controlling weather and atmospheric conditions'
    },
    {
        'name': 'The Blood Queen',
        'x': -0.047094076378314836,
        'y': -0.015511457291586123,
        'color': '#FF5733',
        'id': '60',
        'tags': ['Elizabeth Bathory', 'Queen of Hearts', 'Crimson Queen'],
        'description': 'A female ruler who maintains power through blood magic or sacrifice'
    },
    {
        'name': 'The Void Walker',
        'x': -0.023180265552442778,
        'y': -0.016533176947472333,
        'color': '#FF5733',
        'id': '61',
        'tags': ['Doctor Strange', 'Nightcrawler', "Portal's Chell"],
        'description': 'A character who can traverse or manipulate the empty spaces between realms'
    },
    {
        'name': 'The Summoner',
        'x': -0.006864735859953647,
        'y': 0.019548678457662907,
        'color': '#FF5733',
        'id': '62',
        'tags': ['Yuna', 'Rita Repulsa', 'Pokemon Trainers'],
        'description': 'A magic user who specializes in calling forth creatures or spirits'
    },
    {
        'name': 'The Living Weapon',
        'x': -0.02226065235819405,
        'y': 0.021663065878809007,
        'color': '#FF5733',
        'id': '63',
        'tags': ['Winter Soldier', 'Wolverine', 'Edward Scissorhands'],
        'description': 'A person transformed into a weapon through magic or other means'
    },
    {
        'name': 'The Star Child',
        'x': 0.036147202896778655,
        'y': -0.057225204769549703,
        'color': '#FF5733',
        'id': '64',
        'tags': ['Superman', 'Starman', 'Star-Lord'],
        'description': 'A being of cosmic origin in human form'
    },
    {
        'name': 'The Witch King',
        'x': -0.03538218396459479,
        'y': 0.01788776591247182,
        'color': '#FF5733',
        'id': '65',
        'tags': ['Witch-king of Angmar', 'The Lich King', 'The Night King'],
        'description': 'A male ruler who combines magical power with political authority'
    },
    {
        'name': 'The Memory Keeper',
        'x': 0.031060874763380403,
        'y': -0.001554356741330698,
        'color': '#FF5733',
        'id': '66',
        'tags': ['Dumbledore', 'The Giver', 'Memory Monks'],
        'description': 'A character who preserves or manipulates memories'
    },
    {
        'name': 'The Plague Doctor',
        'x': -0.005797116154073911,
        'y': 0.040288203365824816,
        'color': '#FF5733',
        'id': '67',
        'tags': ['Madam Pomfrey', 'Doctor Strange', 'Elrond'],
        'description': 'A healer who deals with magical diseases and curses'
    },
    {
        'name': 'The Eternal Champion',
        'x': 0.005572784029429775,
        'y': -0.039189299175805783,
        'color': '#FF5733',
        'id': '68',
        'tags': ['Link', "Michael Moorcock's Eternal Champion", 'The Avatar'],
        'description': 'A warrior who is continuously reborn to fight evil across different ages'
    },
    {
        'name': 'The Tomb Raider',
        'x': -0.0021956776505708264,
        'y': -0.010817003520489962,
        'color': '#FF5733',
        'id': '69',
        'tags': ['Indiana Jones', 'Lara Croft', 'Nathan Drake'],
        'description': 'An adventurer who explores ancient magical ruins and artifacts'
    },
    {
        'name': 'The Gatekeeper',
        'x': 0.034063705144001685,
        'y': 0.008123555533934387,
        'color': '#FF5733',
        'id': '70',
        'tags': ['Heimdall', 'The Guardian of Forever', 'Hodor'],
        'description': 'A guardian who protects portals between worlds or realms'
    },
    {
        'name': 'The Cosmic Horror',
        'x': -0.09211471551494714,
        'y': -0.05508184394349716,
        'color': '#FF5733',
        'id': '71',
        'tags': ['Cthulhu', 'The Other Gods', 'The Nothing'],
        'description': 'An ancient being whose very existence threatens reality'
    },
    {
        'name': 'The Undying King',
        'x': -0.04016729777301481,
        'y': -0.034960434286704575,
        'color': '#FF5733',
        'id': '72',
        'tags': ['The Lich King', 'Nagash', 'The Night King'],
        'description': 'A ruler who has achieved immortality through dark means'
    },
    {
        'name': 'The World Walker',
        'x': 0.009431213169413102,
        'y': -0.0073520264745543795,
        'color': '#FF5733',
        'id': '73',
        'tags': ['Rincewind', 'Lyra Belacqua', 'Richard Cypher'],
        'description': 'A traveler who moves between different planes of existence'
    },
    {
        'name': 'The Chaos Mage',
        'x': -0.05437634828174419,
        'y': -0.006766468112396021,
        'color': '#FF5733',
        'id': '74',
        'tags': ['Rincewind', 'Willow', 'Wanda Maximoff'],
        'description': 'A spellcaster who harnesses unpredictable, wild magic'
    },
    {
        'name': 'The Dream Lord',
        'x': -0.014677775805167631,
        'y': -0.007119680558431818,
        'color': '#FF5733',
        'id': '75',
        'tags': ['Morpheus', 'The Sandman', 'Hypnos'],
        'description': 'A powerful being who rules over the realm of dreams'
    },
    {
        'name': 'The Soul Weaver',
        'x': -0.003198137877470683,
        'y': -0.04344145150001827,
        'color': '#FF5733',
        'id': '76',
        'tags': ['Doctor Facilier', 'Shang Tsung', 'Death'],
        'description': 'A magic user who can manipulate the essence of life itself'
    },
    {
        'name': 'The Forgotten God',
        'x': -0.017970314833940293,
        'y': -0.0054723489564884875,
        'color': '#FF5733',
        'id': '77',
        'tags': ['Wednesday', 'Pan', 'The Old Gods'],
        'description': 'A deity who has lost most of their worshippers and power'
    },
    {
        'name': 'The Rune Master',
        'x': 0.011297180111534869,
        'y': -0.0030608342027935026,
        'color': '#FF5733',
        'id': '78',
        'tags': ['Elminster', 'Doctor Strange', 'Gandalf'],
        'description': 'A scholar who derives power from ancient magical symbols'
    },
    {
        'name': 'The Living Legend',
        'x': 0.07181392854330788,
        'y': -0.004378664190520215,
        'color': '#FF5733',
        'id': '79',
        'tags': ["Drizzt Do'Urden", 'Conan', 'King Arthur'],
        'description': 'A hero whose deeds have become mythological in their own lifetime'
    },
    {
        'name': 'The Death Knight',
        'x': -0.04278984197736585,
        'y': 0.006964246387557549,
        'color': '#FF5733',
        'id': '80',
        'tags': ['Arthas', 'Lord Soth', 'The Nazgûl'],
        'description': 'A fallen warrior resurrected to serve dark powers'
    },
    {
        'name': 'The Spell Thief',
        'x': -0.059289727825152905,
        'y': 0.0005533243550467082,
        'color': '#FF5733',
        'id': '81',
        'tags': ['Rogue', 'Sylar', 'Peter Petrelli'],
        'description': "A character who can steal or copy others' magical abilities"
    },
    {
        'name': 'The Living Prophecy',
        'x': 0.053561600877030366,
        'y': -0.01613123845734249,
        'color': '#FF5733',
        'id': '82',
        'tags': ['Neo', 'John Connor', 'Anakin Skywalker'],
        'description': 'A person whose very existence fulfills an ancient prediction'
    },
    {
        'name': 'The Cosmic Trickster',
        'x': -0.05046367136882146,
        'y': -0.008135816838657411,
        'color': '#FF5733',
        'id': '83',
        'tags': ['Q', 'Mr. Mxyzptlk', 'Coyote'],
        'description': 'A powerful being who uses chaos and mischief to test heroes'
    },
    {
        'name': 'The Spirit Walker',
        'x': 0.013173477930409142,
        'y': -0.02608131369581232,
        'color': '#FF5733',
        'id': '84',
        'tags': ['Aang', 'John Constantine', 'Doctor Strange'],
        'description': 'A shaman who can journey through the spirit world'
    },
    {
        'name': 'The Cursed Prophet',
        'x': -0.030406717348099715,
        'y': 0.03057624992187216,
        'color': '#FF5733',
        'id': '85',
        'tags': ['Cassandra', 'Trelawney', 'The Oracle'],
        'description': 'A seer whose predictions are true but never believed'
    },
    {
        'name': 'The Elemental Lord',
        'x': -0.009601413523807556,
        'y': -0.021316161763302977,
        'color': '#FF5733',
        'id': '86',
        'tags': ['Poseidon', 'Gaia', 'Mother Nature'],
        'description': 'A being who embodies and controls a force of nature'
    },
    {
        'name': 'The Void Lord',
        'x': -0.07782550545167394,
        'y': -0.034452945132810595,
        'color': '#FF5733',
        'id': '87',
        'tags': ['Dormammu', 'The Nothing', 'Anti-Monitor'],
        'description': 'A entity seeking to consume or nullify existence itself'
    }];

export const scientificFieldsData: ArchetypeNode[] = [
    {
        "name": "Quantum Mechanics",
        "description": "Reality is fundamentally probabilistic at small scales. Particles exist in multiple states simultaneously until measured, following wave equations. These quantum rules, though deeply counter-intuitive, perfectly predict particle behavior and give rise to all chemistry and material properties.",
        "tags": [
            "Physical Foundations"
        ],
        "x": 205.5488891602,
        "y": 82.0199813843,
        "color": "#FF5733",
        "id": "0"
    },
    {
        "name": "Relativity",
        "description": "Space and time are aspects of a unified spacetime that warps in the presence of mass and energy. The speed of light is constant for all observers, making time and space relative to motion. This geometry of spacetime explains gravity and sets ultimate speed limits for causality.",
        "tags": [
            "Physical Foundations"
        ],
        "x": 248.0623931885,
        "y": 81.3180923462,
        "color": "#FF5733",
        "id": "1"
    },
    {
        "name": "Elementary Particles & Forces",
        "description": "Matter consists of fundamental particles whose interactions are governed by four basic forces. These particles combine according to quantum rules to form all observed matter. The symmetries in these force laws determine what interactions are possible and conserved.",
        "tags": [
            "Physical Foundations"
        ],
        "x": 229.4452972412,
        "y": 65.5886535645,
        "color": "#FF5733",
        "id": "2"
    },
    {
        "name": "Field Theories",
        "description": "All forces and particles are manifestations of underlying fields permeating spacetime. Changes in these fields propagate as waves, carrying energy and information. The quantum nature of fields explains both particle-like and wave-like behaviors of matter and energy.",
        "tags": [
            "Physical Foundations"
        ],
        "x": 223.1578826904,
        "y": 70.0956802368,
        "color": "#FF5733",
        "id": "3"
    },
    {
        "name": "Space & Time",
        "description": "Space and time form a dynamic fabric that can bend, stretch, and ripple according to its contents. Empty space contains quantum fluctuations and dark energy driving cosmic expansion. The arrow of time emerges from increasing entropy and expanding space.",
        "tags": [
            "Physical Foundations"
        ],
        "x": 267.2689819336,
        "y": 94.4313812256,
        "color": "#FF5733",
        "id": "4"
    },
    {
        "name": "Thermodynamics",
        "description": "Energy flows spontaneously from concentrated to dispersed states, while entropy always increases globally. Local order can be created only by increasing disorder elsewhere. This one-way flow of energy drives all natural processes and sets fundamental limits on efficiency.",
        "tags": [
            "Matter & Energy"
        ],
        "x": 294.7438659668,
        "y": 180.14012146,
        "color": "#FF5733",
        "id": "5"
    },
    {
        "name": "Statistical Mechanics",
        "description": "Macroscopic properties emerge from the average behavior of countless microscopic components. Random molecular motions produce predictable bulk properties through statistical laws. Temperature and pressure are emergent properties of particle motion.",
        "tags": [
            "Matter & Energy"
        ],
        "x": 217.8355102539,
        "y": 106.8799972534,
        "color": "#FF5733",
        "id": "6"
    },
    {
        "name": "Chemical Bonding",
        "description": "Atoms share or transfer electrons to form bonds according to quantum rules. The arrangement and properties of these bonds determine material behavior. All chemical reactions are rearrangements of these electron relationships.",
        "tags": [
            "Matter & Energy"
        ],
        "x": 209.3815765381,
        "y": 50.0,
        "color": "#FF5733",
        "id": "7"
    },
    {
        "name": "Phase Transitions",
        "description": "Materials undergo sudden collective changes in properties at critical points. These transitions emerge from simple interactions between many components. The same mathematical patterns govern transitions across widely different systems.",
        "tags": [
            "Matter & Energy"
        ],
        "x": 235.8223266602,
        "y": 124.7285232544,
        "color": "#FF5733",
        "id": "8"
    },
    {
        "name": "Condensed Matter",
        "description": "Electrons and atoms in materials form collective states with emergent properties. These states include crystals, metals, semiconductors, and exotic quantum phases. Material properties arise from the organized behavior of vast numbers of particles.",
        "tags": [
            "Matter & Energy"
        ],
        "x": 228.3762207031,
        "y": 87.8184661865,
        "color": "#FF5733",
        "id": "9"
    },
    {
        "name": "Cosmology",
        "description": "The universe expands from an initial hot dense state, following simple physical laws. Most matter is invisible and only interacts through gravity. The large-scale structure of space emerges from quantum fluctuations magnified by cosmic inflation.",
        "tags": [
            "Cosmic Structures"
        ],
        "x": 282.2306518555,
        "y": 110.8216400146,
        "color": "#FF5733",
        "id": "10"
    },
    {
        "name": "Stellar Evolution",
        "description": "Stars form from collapsing clouds of gas, fusing elements in their cores until fuel depletes. Different initial masses lead to different life cycles and end states. The heavy elements of life were forged in stellar furnaces.",
        "tags": [
            "Cosmic Structures"
        ],
        "x": 303.3433227539,
        "y": 139.010269165,
        "color": "#FF5733",
        "id": "11"
    },
    {
        "name": "Galactic Dynamics",
        "description": "Galaxies are vast collections of stars, gas, and dark matter held together by gravity. Their structures emerge from the competition between gravity, rotation, and random motion. Galaxy interactions drive the evolution of cosmic structure.",
        "tags": [
            "Cosmic Structures"
        ],
        "x": 288.9107971191,
        "y": 121.0477523804,
        "color": "#FF5733",
        "id": "12"
    },
    {
        "name": "Plate Tectonics",
        "description": "Earth's crust is divided into moving plates floating on a plastic mantle, driven by heat from the core. These plates collide, separate, and slide past each other, building mountains and opening oceans. The surface of Earth is continually recycled through this process.",
        "tags": [
            "Earth Systems"
        ],
        "x": 348.6063842773,
        "y": 199.2106018066,
        "color": "#FF5733",
        "id": "13"
    },
    {
        "name": "Climate Dynamics",
        "description": "Earth's climate emerges from complex interactions between atmosphere, oceans, ice, and life. Energy from the sun drives global circulation patterns and water cycles. Feedback loops can amplify or dampen changes in this coupled system.",
        "tags": [
            "Earth Systems"
        ],
        "x": 336.4713134766,
        "y": 202.9940948486,
        "color": "#FF5733",
        "id": "14"
    },
    {
        "name": "Geological Cycles",
        "description": "Elements cycle through Earth's systems, moving between atmosphere, oceans, crust, and life. These biogeochemical cycles operate on timescales from days to millions of years. The rates and patterns of these cycles shape Earth's environment.",
        "tags": [
            "Earth Systems"
        ],
        "x": 350.0,
        "y": 219.0666503906,
        "color": "#FF5733",
        "id": "15"
    },
    {
        "name": "Atmospheric Science",
        "description": "The atmosphere is a fluid system driven by solar heating and Earth's rotation. Temperature gradients create pressure differences that drive wind patterns. Water vapor acts as both greenhouse gas and conveyor of heat.",
        "tags": [
            "Earth Systems"
        ],
        "x": 333.0950317383,
        "y": 186.7100830078,
        "color": "#FF5733",
        "id": "16"
    },
    {
        "name": "Evolution",
        "description": "Genes that lead to more survival and reproduction spread through populations. Random mutations provide new variations, while selection pressure drives adaptation. The apparent design in nature emerges from this simple recursive process.",
        "tags": [
            "Life Processes"
        ],
        "x": 314.7241821289,
        "y": 337.9164428711,
        "color": "#FF5733",
        "id": "17"
    },
    {
        "name": "Genetics",
        "description": "DNA stores and transmits hereditary information through a code shared by all life. Genes are expressed through RNA into proteins that build and regulate cells. Genetic networks control development and respond to environment.",
        "tags": [
            "Life Processes"
        ],
        "x": 282.8746337891,
        "y": 309.7677307129,
        "color": "#FF5733",
        "id": "18"
    },
    {
        "name": "Cell Biology",
        "description": "Cells are self-replicating molecular machines maintained by metabolic networks. Membranes separate internal order from external chaos while controlling material flow. Complex cellular behaviors emerge from networks of simple chemical reactions.",
        "tags": [
            "Life Processes"
        ],
        "x": 273.766204834,
        "y": 289.3053283691,
        "color": "#FF5733",
        "id": "19"
    },
    {
        "name": "Metabolism",
        "description": "Living systems maintain organization by capturing and transforming energy from environment. Chemical reactions are coupled so that favorable ones drive unfavorable ones. Life exists far from equilibrium, sustained by continuous energy flow.",
        "tags": [
            "Life Processes"
        ],
        "x": 325.3906555176,
        "y": 235.5748596191,
        "color": "#FF5733",
        "id": "20"
    },
    {
        "name": "Development",
        "description": "Complex organisms develop from simple beginnings through cascading genetic switches. Local cell interactions generate global patterns and structures. The same molecular toolkits are reused in different contexts to build diverse body plans.",
        "tags": [
            "Life Processes"
        ],
        "x": 265.5623168945,
        "y": 256.9483032227,
        "color": "#FF5733",
        "id": "21"
    },
    {
        "name": "Ecological Networks",
        "description": "Species interact through networks of competition, cooperation, and consumption. These interactions create feedback loops that regulate populations. Ecosystem stability emerges from the web of relationships between species.",
        "tags": [
            "Life Processes"
        ],
        "x": 337.5375671387,
        "y": 292.162689209,
        "color": "#FF5733",
        "id": "22"
    },
    {
        "name": "Information Theory",
        "description": "Information is fundamentally about reducing uncertainty through patterns. All communication channels have maximum capacity limits set by noise. Data can be compressed by finding and removing redundancy.",
        "tags": [
            "Information & Computation"
        ],
        "x": 88.0778808594,
        "y": 168.132019043,
        "color": "#FF5733",
        "id": "23"
    },
    {
        "name": "Computational Limits",
        "description": "Some problems are inherently harder than others, requiring exponentially more resources. Not all well-defined problems are computable, even in principle. Physical laws limit the ultimate speed and density of computation.",
        "tags": [
            "Information & Computation"
        ],
        "x": 133.8276062012,
        "y": 138.583770752,
        "color": "#FF5733",
        "id": "24"
    },
    {
        "name": "Algorithmic Complexity",
        "description": "Problems can be classified by how resources required scale with input size. The structure of a problem determines the most efficient possible solution. Some patterns can only be found by essentially trying all possibilities.",
        "tags": [
            "Information & Computation"
        ],
        "x": 143.5405731201,
        "y": 175.6410064697,
        "color": "#FF5733",
        "id": "25"
    },
    {
        "name": "Cryptography",
        "description": "Information can be encoded so that specific transformations are easy in one direction but effectively impossible to reverse. Mathematical asymmetries enable secure communication over insecure channels. Perfect secrecy requires random keys as long as messages.",
        "tags": [
            "Information & Computation"
        ],
        "x": 75.0,
        "y": 155.2153015137,
        "color": "#FF5733",
        "id": "26"
    },
    {
        "name": "Network Theory",
        "description": "Complex systems can be represented as nodes connected by links, revealing universal patterns. The structure of these connections determines system behavior more than individual components. Small changes in connectivity can trigger large-scale phase transitions.",
        "tags": [
            "Systems & Complexity"
        ],
        "x": 210.0147705078,
        "y": 182.5680084229,
        "color": "#FF5733",
        "id": "27"
    },
    {
        "name": "Chaos Theory",
        "description": "Simple deterministic systems can produce unpredictable behavior through nonlinear feedback. Small changes in initial conditions lead to dramatically different outcomes. Perfect prediction becomes impossible beyond a characteristic time.",
        "tags": [
            "Systems & Complexity"
        ],
        "x": 190.8912811279,
        "y": 111.0230789185,
        "color": "#FF5733",
        "id": "28"
    },
    {
        "name": "Emergence",
        "description": "Complex global behaviors arise from simple local interactions between many parts. These collective properties cannot be reduced to individual components. New laws and patterns become relevant at each level of organization.",
        "tags": [
            "Systems & Complexity"
        ],
        "x": 233.4195404053,
        "y": 215.1489562988,
        "color": "#FF5733",
        "id": "29"
    },
    {
        "name": "Self-Organization",
        "description": "Systems spontaneously develop ordered patterns without central control when driven far from equilibrium. Local interactions create global structures through positive and negative feedback. Similar patterns emerge across widely different systems.",
        "tags": [
            "Systems & Complexity"
        ],
        "x": 267.9150390625,
        "y": 200.7782745361,
        "color": "#FF5733",
        "id": "30"
    },
    {
        "name": "Control Systems",
        "description": "Systems maintain stability through feedback loops that detect and correct deviations. Too much positive feedback leads to runaway behavior, while too much negative feedback causes oscillation. Complex systems require multiple overlapping control mechanisms.",
        "tags": [
            "Systems & Complexity"
        ],
        "x": 306.3902587891,
        "y": 247.9595947266,
        "color": "#FF5733",
        "id": "31"
    },
    {
        "name": "Logic & Proof",
        "description": "Mathematical truth flows from axioms through rules of inference to conclusions. Some true statements cannot be proven within any consistent system. The limits of logic reveal fundamental constraints on knowledge.",
        "tags": [
            "Mathematical Structures"
        ],
        "x": 163.6793518066,
        "y": 126.9365463257,
        "color": "#FF5733",
        "id": "32"
    },
    {
        "name": "Number Theory",
        "description": "Numbers exhibit deep patterns that connect seemingly unrelated mathematical structures. Prime numbers serve as atomic building blocks for all integers. Simple patterns can hide incredible computational complexity.",
        "tags": [
            "Mathematical Structures"
        ],
        "x": 197.256439209,
        "y": 153.0223083496,
        "color": "#FF5733",
        "id": "33"
    },
    {
        "name": "Geometry & Topology",
        "description": "Shapes and spaces have properties that remain invariant under certain transformations. Local geometry determines what paths and movements are possible. Topology reveals global constraints on continuous change.",
        "tags": [
            "Mathematical Structures"
        ],
        "x": 225.4057769775,
        "y": 162.4896850586,
        "color": "#FF5733",
        "id": "34"
    },
    {
        "name": "Probability",
        "description": "Random processes produce predictable patterns when aggregated over many trials. Uncertainty can be quantified and manipulated according to precise mathematical rules. Complex events can be decomposed into simpler independent components.",
        "tags": [
            "Mathematical Structures"
        ],
        "x": 183.2498626709,
        "y": 122.3479309082,
        "color": "#FF5733",
        "id": "35"
    },
    {
        "name": "Group Theory",
        "description": "Symmetries form mathematical structures that reveal deep patterns in nature. The possible transformations of a system determine its fundamental properties. Similar symmetry patterns appear across different physical systems.",
        "tags": [
            "Mathematical Structures"
        ],
        "x": 220.5540008545,
        "y": 154.2528381348,
        "color": "#FF5733",
        "id": "36"
    },
    {
        "name": "Neural Processing",
        "description": "Brains process information through vast networks of simple neurons firing in parallel. Neural patterns self-organize through feedback between different brain regions. Consciousness emerges from this distributed processing network.",
        "tags": [
            "Cognitive Systems"
        ],
        "x": 217.5437927246,
        "y": 324.8016357422,
        "color": "#FF5733",
        "id": "37"
    },
    {
        "name": "Learning & Memory",
        "description": "Neural networks adjust connection strengths based on experience and feedback. Memory emerges from persistent changes in network structure. Learning occurs through prediction errors that refine internal models.",
        "tags": [
            "Cognitive Systems"
        ],
        "x": 235.1314544678,
        "y": 330.0647583008,
        "color": "#FF5733",
        "id": "38"
    },
    {
        "name": "Perception",
        "description": "Brains construct models of reality by combining sensory data with prior expectations. What we perceive is an inference about causes of sensory input. Attention selectively enhances some signals while suppressing others.",
        "tags": [
            "Cognitive Systems"
        ],
        "x": 213.9790649414,
        "y": 321.325012207,
        "color": "#FF5733",
        "id": "39"
    },
    {
        "name": "Decision Making",
        "description": "Brains compute value and probability estimates from noisy evidence through parallel processing. Decisions emerge from competition between neural populations representing different options. Emotion and reward shape the weighting of different factors.",
        "tags": [
            "Cognitive Systems"
        ],
        "x": 197.1123657227,
        "y": 297.3320922852,
        "color": "#FF5733",
        "id": "40"
    },
    {
        "name": "Language",
        "description": "Language combines finite elements recursively to generate infinite possible meanings. Grammar represents deep structural patterns shared across all human languages. Words gain meaning through patterns of use in context rather than fixed definitions.",
        "tags": [
            "Cognitive Systems"
        ],
        "x": 247.0337524414,
        "y": 226.4267120361,
        "color": "#FF5733",
        "id": "41"
    },
    {
        "name": "Market Dynamics",
        "description": "Individual buying and selling decisions aggregate into prices, which coordinate vast human activity without central control. Markets encode distributed knowledge about supply, demand, and value. Price signals guide resources toward their most valued uses.",
        "tags": [
            "Collective Behavior"
        ],
        "x": 197.5166015625,
        "y": 267.9376220703,
        "color": "#FF5733",
        "id": "42"
    },
    {
        "name": "Social Networks",
        "description": "Human relationships form networks that shape the flow of information and influence. Ideas and behaviors spread through social ties like diseases through populations. Network structure determines the speed and pattern of social diffusion.",
        "tags": [
            "Collective Behavior"
        ],
        "x": 280.7623901367,
        "y": 340.9674987793,
        "color": "#FF5733",
        "id": "43"
    },
    {
        "name": "Game Theory",
        "description": "Strategic situations create interdependent decisions where optimal choices depend on others' actions. Nash equilibria emerge when all players' strategies are optimal given others' choices. Repeated interactions can sustain cooperation through reputation.",
        "tags": [
            "Collective Behavior"
        ],
        "x": 184.4698028564,
        "y": 264.5478210449,
        "color": "#FF5733",
        "id": "44"
    },
    {
        "name": "Evolutionary Dynamics",
        "description": "Strategies that succeed tend to spread through populations, whether genetic or cultural. Competition between variants drives adaptation to changing conditions. Similar patterns appear in biological evolution, cultural change, and market competition.",
        "tags": [
            "Collective Behavior"
        ],
        "x": 322.6569213867,
        "y": 344.1632385254,
        "color": "#FF5733",
        "id": "45"
    },
    {
        "name": "Collective Intelligence",
        "description": "Groups can solve problems more effectively than individuals through diversity and aggregation. Wisdom of crowds emerges when errors cancel out and information is aggregated efficiently. Different collective structures favor different types of problem-solving.",
        "tags": [
            "Collective Behavior"
        ],
        "x": 215.8798675537,
        "y": 247.7997741699,
        "color": "#FF5733",
        "id": "46"
    },
    {
        "name": "Signal Processing",
        "description": "Information can be encoded in patterns of energy or matter that propagate through channels. Signals can be filtered, transformed, and reconstructed using mathematical operations. Noise fundamentally limits the reliability of transmission.",
        "tags": [
            "Technological Principles"
        ],
        "x": 92.8807830811,
        "y": 184.7098236084,
        "color": "#FF5733",
        "id": "47"
    },
    {
        "name": "Energy Conversion",
        "description": "Energy can be transformed between different forms but never created or destroyed. Every conversion produces some waste heat, limiting efficiency. Different energy forms have different quality levels and usefulness.",
        "tags": [
            "Technological Principles"
        ],
        "x": 103.0887374878,
        "y": 120.9178543091,
        "color": "#FF5733",
        "id": "48"
    },
    {
        "name": "Materials Engineering",
        "description": "Material properties emerge from atomic structure and organization across multiple scales. Defects and interfaces often control bulk behavior more than perfect regions. Processing history determines final material structure.",
        "tags": [
            "Technological Principles"
        ],
        "x": 234.6628265381,
        "y": 92.6903839111,
        "color": "#FF5733",
        "id": "49"
    },
    {
        "name": "Information Storage",
        "description": "Information requires physical substrate and minimum energy to maintain against noise. Storage density is limited by thermal fluctuations and quantum effects. Different physical mechanisms trade off density, stability, and access speed.",
        "tags": [
            "Technological Principles"
        ],
        "x": 105.2062530518,
        "y": 139.6868896484,
        "color": "#FF5733",
        "id": "50"
    },
    {
        "name": "Communication Systems",
        "description": "Information transmission requires shared protocols for encoding and decoding. Channel capacity limits are set by bandwidth and signal-to-noise ratio. Error detection and correction enable reliability over noisy channels.",
        "tags": [
            "Technological Principles"
        ],
        "x": 84.0221786499,
        "y": 169.0595092773,
        "color": "#FF5733",
        "id": "51"
    },
    {
        "name": "Reaction Networks",
        "description": "Chemical reactions form complex networks of interdependent processes and cycles. Catalysts enable specific reaction paths while blocking others. System behavior emerges from the entire reaction network rather than individual steps.",
        "tags": [
            "Chemical Systems"
        ],
        "x": 316.4540405273,
        "y": 274.4562988281,
        "color": "#FF5733",
        "id": "52"
    },
    {
        "name": "Molecular Recognition",
        "description": "Molecules interact through specific patterns of shape and charge distribution. Lock-and-key mechanisms enable molecular machines and information processing. Biology exploits these recognition patterns for regulation and control.",
        "tags": [
            "Chemical Systems"
        ],
        "x": 259.6246643066,
        "y": 295.1257324219,
        "color": "#FF5733",
        "id": "53"
    },
    {
        "name": "Self-Assembly",
        "description": "Molecules spontaneously organize into complex structures through local interactions. Final forms are encoded in component shapes and interaction rules. Similar principles govern assembly across many scales.",
        "tags": [
            "Chemical Systems"
        ],
        "x": 249.4352874756,
        "y": 232.6612243652,
        "color": "#FF5733",
        "id": "54"
    },
    {
        "name": "Quantum Properties",
        "description": "Quantum effects create discrete energy levels and allowed states in atoms and molecules. Chemical bonds arise from shared electron wavefunctions between atoms. Quantum tunneling enables reactions forbidden by classical mechanics.",
        "tags": [
            "Chemical Systems"
        ],
        "x": 200.1915130615,
        "y": 60.8611984253,
        "color": "#FF5733",
        "id": "55"
    },
    {
        "name": "Catalysis",
        "description": "Catalysts create alternative reaction pathways with lower energy barriers. Networks of catalysts can form self-sustaining cycles and feedback loops. Life exploits catalysis to control and accelerate specific chemical transformations.",
        "tags": [
            "Chemical Systems"
        ],
        "x": 328.9574890137,
        "y": 272.2946166992,
        "color": "#FF5733",
        "id": "56"
    },
    {
        "name": "Genetic Regulation",
        "description": "Genes form complex networks where proteins regulate other genes' expression. These networks can generate stable states, oscillations, and complex dynamics. Simple regulatory circuits produce complex temporal and spatial patterns.",
        "tags": [
            "Biological Information"
        ],
        "x": 289.4255981445,
        "y": 280.3348388672,
        "color": "#FF5733",
        "id": "57"
    },
    {
        "name": "Cellular Signaling",
        "description": "Cells communicate through molecular signals that trigger cascading responses. Signal amplification and feedback create switch-like responses to gradual changes. Networks of signaling pathways integrate multiple inputs to coordinate cell behavior.",
        "tags": [
            "Biological Information"
        ],
        "x": 265.7659301758,
        "y": 299.5549926758,
        "color": "#FF5733",
        "id": "58"
    },
    {
        "name": "Neural Coding",
        "description": "Neurons encode information in patterns of electrical spikes over time. Population coding distributes information across many neurons. Temporal and spatial patterns in neural activity represent sensory information and motor commands.",
        "tags": [
            "Biological Information"
        ],
        "x": 204.5464324951,
        "y": 341.8219909668,
        "color": "#FF5733",
        "id": "59"
    },
    {
        "name": "Immune Recognition",
        "description": "Immune systems learn to recognize patterns that distinguish self from non-self. Diverse receptor populations evolve through variation and selection. Memory of past encounters enables faster future responses.",
        "tags": [
            "Biological Information"
        ],
        "x": 255.90965271,
        "y": 321.7268676758,
        "color": "#FF5733",
        "id": "60"
    },
    {
        "name": "Developmental Patterning",
        "description": "Spatial patterns in organisms emerge from gradients of signaling molecules. Cells respond to relative rather than absolute signal levels. Simple rules of local interaction generate complex global patterns.",
        "tags": [
            "Biological Information"
        ],
        "x": 260.1298217773,
        "y": 258.4489746094,
        "color": "#FF5733",
        "id": "61"
    },
    {
        "name": "Population Dynamics",
        "description": "Population sizes change through births, deaths, and migration following mathematical laws. Predator-prey cycles emerge from simple growth and consumption rules. Carrying capacity limits growth through resource competition.",
        "tags": [
            "Ecosystem Dynamics"
        ],
        "x": 346.6805114746,
        "y": 319.3747253418,
        "color": "#FF5733",
        "id": "62"
    },
    {
        "name": "Symbiosis",
        "description": "Species evolve mutually beneficial relationships through reciprocal adaptation. Complex dependencies develop from initially casual interactions. Ecosystems are built on networks of symbiotic relationships.",
        "tags": [
            "Ecosystem Dynamics"
        ],
        "x": 325.2225952148,
        "y": 312.4387512207,
        "color": "#FF5733",
        "id": "63"
    },
    {
        "name": "Nutrient Cycling",
        "description": "Elements cycle between organisms and environment through linked processes. Microorganisms drive most steps in biogeochemical cycles. Ecosystem stability depends on closed loops of nutrient flow.",
        "tags": [
            "Ecosystem Dynamics"
        ],
        "x": 346.3964538574,
        "y": 254.838760376,
        "color": "#FF5733",
        "id": "64"
    },
    {
        "name": "Succession",
        "description": "Ecosystems recover from disturbance through predictable sequences of species. Early colonizers modify environments enabling later species. Mature systems maximize energy capture and nutrient recycling.",
        "tags": [
            "Ecosystem Dynamics"
        ],
        "x": 341.6321716309,
        "y": 297.9805908203,
        "color": "#FF5733",
        "id": "65"
    },
    {
        "name": "Niche Construction",
        "description": "Organisms modify their environments, changing selection pressures on themselves and others. These modifications persist beyond individual lifetimes. Environmental engineering creates new opportunities for adaptation.",
        "tags": [
            "Ecosystem Dynamics"
        ],
        "x": 331.5719299316,
        "y": 314.3104248047,
        "color": "#FF5733",
        "id": "66"
    },
    {
        "name": "Error Correction",
        "description": "Information can be protected from noise through redundant encoding. Perfect error correction requires detecting all possible errors. Natural systems trade off correction ability against resource costs.",
        "tags": [
            "Information Dynamics"
        ],
        "x": 83.5889511108,
        "y": 153.4485778809,
        "color": "#FF5733",
        "id": "67"
    },
    {
        "name": "Compression",
        "description": "Information can be compressed by identifying and encoding patterns. Optimal compression depends on statistical structure of data. Some patterns cannot be compressed at all.",
        "tags": [
            "Information Dynamics"
        ],
        "x": 92.4235916138,
        "y": 155.868270874,
        "color": "#FF5733",
        "id": "68"
    },
    {
        "name": "Search & Optimization",
        "description": "Finding optimal solutions often requires exploring vast possibility spaces. Local optimization can get trapped in suboptimal peaks. Random exploration helps escape local optima.",
        "tags": [
            "Information Dynamics"
        ],
        "x": 162.8022155762,
        "y": 215.434677124,
        "color": "#FF5733",
        "id": "69"
    },
    {
        "name": "Scaling Laws",
        "description": "Many natural systems show consistent mathematical patterns as size changes. These power laws emerge from underlying hierarchical structure. Similar scaling relationships appear across vastly different phenomena.",
        "tags": [
            "Complex Systems Dynamics"
        ],
        "x": 246.0829467773,
        "y": 166.3693237305,
        "color": "#FF5733",
        "id": "70"
    },
    {
        "name": "Critical Phenomena",
        "description": "Systems show universal behavior near transition points between different phases. Fluctuations at all scales emerge at critical points. The same mathematical patterns govern diverse physical and social transitions.",
        "tags": [
            "Complex Systems Dynamics"
        ],
        "x": 237.5516815186,
        "y": 145.4279785156,
        "color": "#FF5733",
        "id": "71"
    },
    {
        "name": "Synchronization",
        "description": "Coupled oscillators spontaneously align their rhythms through weak interactions. Global patterns emerge from local adjustments. Critical coupling strength determines transition to coherent behavior.",
        "tags": [
            "Complex Systems Dynamics"
        ],
        "x": 257.2572631836,
        "y": 183.4657745361,
        "color": "#FF5733",
        "id": "72"
    },
    {
        "name": "Adaptation",
        "description": "Systems modify their internal structure to better match environmental patterns. Learning occurs through feedback between prediction and experience. Similar adaptation principles work across scales from molecules to minds.",
        "tags": [
            "Complex Systems Dynamics"
        ],
        "x": 308.3905029297,
        "y": 309.8975524902,
        "color": "#FF5733",
        "id": "73"
    },
    {
        "name": "Robustness",
        "description": "Complex systems maintain function despite component failures through redundancy and feedback. Different mechanisms provide robustness against different types of perturbation. Robustness often trades off against efficiency.",
        "tags": [
            "Complex Systems Dynamics"
        ],
        "x": 288.6711120605,
        "y": 232.6002502441,
        "color": "#FF5733",
        "id": "74"
    },
    {
        "name": "Symmetry Breaking",
        "description": "Perfect symmetry spontaneously breaks to create structure and pattern. Small asymmetries get amplified through dynamics. Many distinct patterns can emerge from same symmetric starting point.",
        "tags": [
            "Mathematical Patterns"
        ],
        "x": 234.0431518555,
        "y": 169.6649780273,
        "color": "#FF5733",
        "id": "75"
    },
    {
        "name": "Recursive Growth",
        "description": "Simple rules applied repeatedly generate complex structures and patterns. Self-similar patterns appear at multiple scales. Final forms encode history of their formation process.",
        "tags": [
            "Mathematical Patterns"
        ],
        "x": 253.7432403564,
        "y": 211.7790527344,
        "color": "#FF5733",
        "id": "76"
    },
    {
        "name": "Optimization",
        "description": "Natural systems tend toward states that minimize or maximize certain quantities. Multiple competing objectives create trade-off surfaces. Local optimization can prevent finding global optima.",
        "tags": [
            "Mathematical Patterns"
        ],
        "x": 164.500579834,
        "y": 223.6347808838,
        "color": "#FF5733",
        "id": "77"
    },
    {
        "name": "Dimensional Reduction",
        "description": "Complex high-dimensional systems often behave in simpler low-dimensional ways. Key variables capture most important dynamics. Similar reduction principles work across diverse systems.",
        "tags": [
            "Mathematical Patterns"
        ],
        "x": 223.2601623535,
        "y": 192.6030731201,
        "color": "#FF5733",
        "id": "78"
    },
    {
        "name": "Universality",
        "description": "Systems with different microscopic details show same large-scale behavior. Universal patterns emerge near critical points and transitions. Mathematics reveals unity beneath surface differences.",
        "tags": [
            "Mathematical Patterns"
        ],
        "x": 211.8838500977,
        "y": 146.8808441162,
        "color": "#FF5733",
        "id": "79"
    },
    {
        "name": "Modularity",
        "description": "Complex systems are built from semi-independent functional modules. Modules can be recombined to generate new functions. Modular structure enables evolution and adaptation.",
        "tags": [
            "Biological Organization"
        ],
        "x": 267.1643676758,
        "y": 239.0777587891,
        "color": "#FF5733",
        "id": "80"
    },
    {
        "name": "Hierarchical Control",
        "description": "Biological systems use nested levels of regulatory control. Higher levels set goals for lower levels. Different time scales of regulation enable robust adaptive behavior.",
        "tags": [
            "Biological Organization"
        ],
        "x": 297.1489868164,
        "y": 265.5331420898,
        "color": "#FF5733",
        "id": "81"
    },
    {
        "name": "Energy Flow",
        "description": "Living systems maintain organization by channeling energy flow. Networks of coupled reactions distribute energy to needed processes. Energy gradients drive biological computation and control.",
        "tags": [
            "Biological Organization"
        ],
        "x": 311.175994873,
        "y": 222.8834686279,
        "color": "#FF5733",
        "id": "82"
    },
    {
        "name": "Information Processing",
        "description": "Cells and organisms process information to guide behavior. Multiple mechanisms encode, transmit and decode signals. Reliable control emerges from noisy molecular components.",
        "tags": [
            "Biological Organization"
        ],
        "x": 235.9843444824,
        "y": 298.7690429688,
        "color": "#FF5733",
        "id": "83"
    },
    {
        "name": "Homeostasis",
        "description": "Living systems maintain internal conditions through multiple feedback mechanisms. Different variables are regulated at different time scales. Stability requires balancing competing demands.",
        "tags": [
            "Biological Organization"
        ],
        "x": 321.8628540039,
        "y": 243.3216400146,
        "color": "#FF5733",
        "id": "84"
    },
    {
        "name": "Information Limits",
        "description": "Physical laws set fundamental bounds on information storage and processing. Quantum effects limit measurement precision and information density. Energy is required to maintain or erase information.",
        "tags": [
            "Physical Constraints"
        ],
        "x": 117.7425994873,
        "y": 125.313079834,
        "color": "#FF5733",
        "id": "85"
    },
    {
        "name": "Uncertainty",
        "description": "Perfect knowledge of complementary properties is impossible in quantum systems. Measurement inevitably disturbs quantum states. Similar trade-offs appear in macroscopic measurement and control.",
        "tags": [
            "Physical Constraints"
        ],
        "x": 150.0621032715,
        "y": 94.6779174805,
        "color": "#FF5733",
        "id": "86"
    },
    {
        "name": "Causality",
        "description": "Effects cannot precede causes due to light-speed limit on information flow. Quantum entanglement enables correlations but not faster-than-light signaling. Network of cause-effect relations defines possible histories.",
        "tags": [
            "Physical Constraints"
        ],
        "x": 181.3812255859,
        "y": 86.1124725342,
        "color": "#FF5733",
        "id": "87"
    },
    {
        "name": "Computational Bounds",
        "description": "Physical systems can be viewed as performing computations. Speed and density of computation face fundamental physical limits. Different physical implementations trade off various resources.",
        "tags": [
            "Physical Constraints"
        ],
        "x": 124.0375595093,
        "y": 149.0344848633,
        "color": "#FF5733",
        "id": "88"
    },
    {
        "name": "Collective Behavior",
        "description": "Individual interactions generate emergent patterns at group level. Social influence creates feedback loops amplifying small differences. Similar patterns appear in human and animal groups.",
        "tags": [
            "Social Systems"
        ],
        "x": 229.1960449219,
        "y": 254.5636291504,
        "color": "#FF5733",
        "id": "89"
    },
    {
        "name": "Cultural Evolution",
        "description": "Information patterns spread and change through social learning and transmission. Selection pressures drive adaptation of ideas and practices. Cultural and genetic evolution can interact and influence each other.",
        "tags": [
            "Social Systems"
        ],
        "x": 311.5127563477,
        "y": 348.1717224121,
        "color": "#FF5733",
        "id": "90"
    },
    {
        "name": "Economic Organization",
        "description": "Distributed decisions aggregate into prices and resource allocation patterns. Market systems encode information about value and scarcity. Similar principles govern other decentralized coordination systems.",
        "tags": [
            "Social Systems"
        ],
        "x": 191.6411743164,
        "y": 272.4124145508,
        "color": "#FF5733",
        "id": "91"
    },
    {
        "name": "Innovation Dynamics",
        "description": "New combinations of existing elements generate technological progress. Innovation spreads through social networks following mathematical patterns. Development paths show lock-in and path dependence.",
        "tags": [
            "Social Systems"
        ],
        "x": 300.9548339844,
        "y": 350.0,
        "color": "#FF5733",
        "id": "92"
    },
    {
        "name": "Computational Complexity",
        "description": "Problems have inherent difficulty independent of implementation details. Some problems require exponentially growing resources with size. Quantum computers change speed but not fundamental complexity classes.",
        "tags": [
            "Foundational Limits"
        ],
        "x": 144.3115844727,
        "y": 146.0356445312,
        "color": "#FF5733",
        "id": "93"
    },
    {
        "name": "Predictability",
        "description": "Chaos and quantum effects limit long-term prediction in complex systems. Perfect prediction would require infinite precision measurements. Similar uncertainty principles appear across domains.",
        "tags": [
            "Foundational Limits"
        ],
        "x": 155.8661804199,
        "y": 103.5959625244,
        "color": "#FF5733",
        "id": "94"
    },
    {
        "name": "Optimization Constraints",
        "description": "No system can simultaneously optimize multiple competing objectives. Trade-offs create Pareto frontiers of possible solutions. Similar principles constrain biological and engineered systems.",
        "tags": [
            "Foundational Limits"
        ],
        "x": 150.8819274902,
        "y": 209.8026733398,
        "color": "#FF5733",
        "id": "95"
    },
    {
        "name": "Resource Limitations",
        "description": "Physical constraints bound possible combinations of properties. Trade-offs emerge from fundamental physical laws. Similar constraints appear at multiple scales.",
        "tags": [
            "Foundational Limits"
        ],
        "x": 133.4422912598,
        "y": 166.0145263672,
        "color": "#FF5733",
        "id": "96"
    },
    {
        "name": "Emergence Boundaries",
        "description": "New properties and laws emerge at different scales. Reductionism faces practical and theoretical limits. Different descriptions become appropriate at different levels.",
        "tags": [
            "Foundational Limits"
        ],
        "x": 220.6985015869,
        "y": 197.9635467529,
        "color": "#FF5733",
        "id": "97"
    },
    {
        "name": "Measurement Limits",
        "description": "All measurement involves interaction that disturbs the measured system. Perfect precision requires infinite resources. Signal-to-noise ratios constrain possible measurements.",
        "tags": [
            "Foundational Limits"
        ],
        "x": 121.5869598389,
        "y": 107.5081176758,
        "color": "#FF5733",
        "id": "98"
    },
    {
        "name": "Knowledge Horizons",
        "description": "Some truths are undecidable within any formal system. Perfect self-knowledge leads to paradox. Similar epistemic limits appear across domains.",
        "tags": [
            "Foundational Limits"
        ],
        "x": 149.4073181152,
        "y": 111.4973678589,
        "color": "#FF5733",
        "id": "99"
    }
];