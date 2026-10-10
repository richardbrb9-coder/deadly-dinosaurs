// Dinosaur data for the Deadly Dinosaurs app.
// Source: "130 Dinosaur list" Google Sheet (descriptions simplified for young readers, extra clues added).
//
// Each row: [name, group, period, description, clue 3, clue 4, clue 5]
// Clues 1 and 2 are built automatically from the period and group (see buildClues in index.html),
// so the "Who Am I?" game always has 5 clues that go from easy-to-guess-wrong to a big giveaway.
//
// Images: put a picture in the dino-images folder named after the dinosaur in lower case,
// with spaces turned into underscores, e.g. "Tyrannosaurus rex" -> dino-images/tyrannosaurus_rex.webp
// (.webp, .jpg, .jpeg and .png all work; tools/generate_images.py makes them). Until a picture exists the app draws a coloured placeholder.

const DINO_GROUPS = {
    theropod:   { label: "Theropods",          short: "Theropod",         emoji: "🦖", meaning: "Beast Foot",
                  about: "The fierce hunters and speedy runners. They walked on two legs, and almost all the meat-eaters belong to this group. Birds are their great-great-grandchildren!" },
    sauropod:   { label: "Long-Necks",         short: "Sauropodomorph",   emoji: "🦕", meaning: "Lizard-Foot Form",
                  about: "The towering long-necked giants. Huge plant-eaters with tiny heads, tree-trunk legs and long whippy tails." },
    ornithopod: { label: "Duck-Bills & Beaks", short: "Ornithopod",       emoji: "🦆", meaning: "Bird Foot",
                  about: "The 'cows' of the dinosaur world. Peaceful plant-eaters with beaks, often living together in big herds." },
    margino:    { label: "Horns & Domes",      short: "Marginocephalian", emoji: "🦏", meaning: "Fringed Head",
                  about: "Plant-eaters with amazing heads: bony frills, sharp horns, parrot beaks or super-thick domes." },
    thyreo:     { label: "Armoured",           short: "Thyreophoran",     emoji: "🛡️", meaning: "Shield Bearer",
                  about: "Walking tanks! Slow plant-eaters covered in bony plates, spikes and sometimes a big tail club." },
    pterosaur:  { label: "Flying Reptiles",    short: "Pterosaur",        emoji: "🦅", meaning: "Winged Lizard",
                  about: "The masters of the sky. Not dinosaurs, but their flying reptile cousins, with leathery wings." },
    marine:     { label: "Sea Reptiles",       short: "Marine Reptile",   emoji: "🌊", meaning: "Ocean Dwellers",
                  about: "The monsters of the deep. Not dinosaurs, but giant reptiles with flippers that ruled the oceans." }
};

// Anything not listed here eats what its group usually eats (theropods: meat, sea reptiles: meat, others: plants).
const DINO_DIET_OVERRIDES = {
    "Spinosaurus": "fish", "Baryonyx": "fish", "Suchomimus": "fish", "Irritator": "fish", "Austroraptor": "fish",
    "Pteranodon": "fish", "Pterodactylus": "fish", "Quetzalcoatlus": "meat", "Dimorphodon": "meat", "Tapejara": "omni",
    "Therizinosaurus": "plant", "Eoraptor": "omni", "Oviraptor": "omni", "Gallimimus": "omni", "Ornithomimus": "omni",
    "Struthiomimus": "omni", "Gigantoraptor": "omni", "Deinocheirus": "omni", "Pelecanimimus": "omni"
};

const DINO_ROWS = [
    // ---------- THEROPODS ----------
    ["Tyrannosaurus rex", "theropod", "Cretaceous", "A giant meat-eater with huge teeth, a mighty bite and tiny little arms!", "I walked on two strong legs and had a gigantic head.", "My teeth were as big as bananas!", "My name means 'Tyrant Lizard King'."],
    ["Velociraptor", "theropod", "Cretaceous", "A small, speedy, clever hunter covered in feathers. It was only about as big as a turkey!", "I was covered in feathers, but I could not fly.", "I was only about as big as a turkey.", "I have a sharp, curved sickle-claw on each foot."],
    ["Spinosaurus", "theropod", "Cretaceous", "A giant fish-eating dinosaur with a huge sail on its back. It loved the water!", "I had a long snout like a crocodile.", "I had a giant sail on my back.", "I am the largest meat-eating dinosaur and I love the water."],
    ["Allosaurus", "theropod", "Jurassic", "A big, strong hunter with sharp claws and a powerful bite.", "I had little bumpy horns above my eyes.", "I liked to hunt Stegosaurus!", "I was the most feared hunter of the late Jurassic period."],
    ["Carnotaurus", "theropod", "Cretaceous", "A fast-running hunter with two horns above its eyes, just like a bull!", "My arms were even tinier than a T. rex's arms!", "I could run really fast on my long legs.", "My name means 'Meat-Eating Bull'."],
    ["Giganotosaurus", "theropod", "Cretaceous", "One of the biggest meat-eaters ever, as big as T. rex or even bigger!", "I was as long as a bus.", "My name means 'Giant Southern Lizard'.", "I lived in South America and hunted massive long-necked dinosaurs."],
    ["Dilophosaurus", "theropod", "Jurassic", "A fast hunter with two curved crests on top of its head.", "I was one of the biggest hunters of the early Jurassic.", "My two crests were thin, like plates.", "I have a double-crest on my head."],
    ["Ceratosaurus", "theropod", "Jurassic", "A fierce hunter with a horn on its nose and bony bumps down its back.", "I lived at the same time as Allosaurus.", "I had a row of little bony bumps down my back.", "I have a blade-like horn on my nose."],
    ["Coelophysis", "theropod", "Triassic", "A small, skinny and super-fast dinosaur from the very beginning of the dinosaur age.", "I was light and skinny, with hollow bones like a bird.", "Lots of us were found together in one place in New Mexico.", "I am one of the earliest known dinosaurs."],
    ["Therizinosaurus", "theropod", "Cretaceous", "A strange feathered dinosaur with giant claws as long as your arm! It ate plants.", "I had a little head and a big round tummy.", "Each of my claws was longer than a ruler.", "I have the longest claws of any animal ever discovered."],
    ["Deinonychus", "theropod", "Cretaceous", "A clever, feathered hunter that worked in a team. It helped give movie raptors their look!", "I hunted in groups with my friends.", "I had a big curved claw on each foot.", "My name means 'Terrible Claw'."],
    ["Baryonyx", "theropod", "Cretaceous", "A dinosaur with a crocodile-shaped snout that loved to catch fish.", "I had a long, thin snout full of teeth.", "My first fossil was found in a clay pit in England.", "I have a heavy, curved claw on my thumb for catching fish."],
    ["Utahraptor", "theropod", "Cretaceous", "The biggest raptor ever, as long as a car!", "I was covered in feathers.", "The claw on each of my feet was as long as a banana.", "I am a giant raptor found in North America."],
    ["Compsognathus", "theropod", "Jurassic", "A tiny dinosaur about the size of a chicken that chased bugs and lizards.", "I was so small I could sit on your lap.", "I was very quick and chased little lizards.", "I am one of the smallest known dinosaurs."],
    ["Megalosaurus", "theropod", "Jurassic", "A big, bulky meat-eater and the very first dinosaur ever given a name!", "My bones were found in England a long, long time ago.", "My name means 'Great Lizard'.", "I was the first dinosaur ever described by scientists."],
    ["Acrocanthosaurus", "theropod", "Cretaceous", "A huge hunter with a tall ridge of spines along its back.", "I lived in North America.", "I had a bumpy ridge running from my neck to my tail.", "My name means 'High-Spined Lizard'."],
    ["Troodon", "theropod", "Cretaceous", "A small, bird-like dinosaur with big eyes and a big brain for its size.", "My big eyes helped me see when it was dark.", "I walked on two legs and had a curved toe-claw.", "I am considered one of the smartest dinosaurs."],
    ["Oviraptor", "theropod", "Cretaceous", "A feathered dinosaur with a beak. People thought it stole eggs, but it was really looking after its own!", "I had a beak instead of teeth.", "I had a crest on my head.", "I am known for protecting my nests, not stealing from them!"],
    ["Gallimimus", "theropod", "Cretaceous", "A fast runner that looked a lot like an ostrich.", "I had long legs and a long neck.", "I had a beak with no teeth.", "I look like a giant bird but I cannot fly."],
    ["Microraptor", "theropod", "Cretaceous", "A tiny dinosaur with four wings that glided from tree to tree.", "I was about as small as a crow.", "My feathers were shiny and black, like a crow's.", "I have feathers and wings on both my arms and my legs!"],
    ["Archaeopteryx", "theropod", "Jurassic", "A famous feathered dinosaur that was part dinosaur and part bird!", "I had wings and feathers, but also teeth and a bony tail.", "I was about the size of a crow.", "I am famous for being the 'first bird'."],
    ["Herrerasaurus", "theropod", "Triassic", "One of the very first meat-eating dinosaurs.", "I lived in South America.", "I had sharp, curved teeth and walked on two legs.", "I lived at the very dawn of the dinosaur age."],
    ["Eoraptor", "theropod", "Triassic", "A small dinosaur from the very start of the dinosaur age. It ate plants and bugs.", "I was about the size of a fox.", "I lived in Argentina.", "My name means 'Dawn Thief'."],
    ["Cryolophosaurus", "theropod", "Jurassic", "A crested hunter found in the frozen rocks of Antarctica!", "My fossils were found near the South Pole.", "My crest went sideways across my head.", "I am known as the 'Elvis' dinosaur because of my cool crest."],
    ["Gigantoraptor", "theropod", "Cretaceous", "A giant feathered dinosaur with a beak and no teeth, as heavy as a car!", "I lived in China.", "I had very long legs and a beak.", "I am a giant, bird-like dinosaur that grew as heavy as a car."],
    ["Deinocheirus", "theropod", "Cretaceous", "A strange, bulky dinosaur with a hump on its back and very long arms.", "I had a beak shaped like a duck's.", "For years scientists only had my giant arms!", "I have the largest arms of any dinosaur that walked on two legs."],
    ["Anchiornis", "theropod", "Jurassic", "A tiny feathered dinosaur. Scientists even know what colours its feathers were!", "I had feathers on my arms and my legs.", "I had a reddish crest on my head.", "Scientists know exactly what colors my feathers were."],
    ["Sinosauropteryx", "theropod", "Cretaceous", "The first dinosaur ever found with feathers.", "I was small and covered in fluffy feathers.", "I lived in China.", "I had a striped, ginger-and-white tail like a lemur."],
    ["Guanlong", "theropod", "Jurassic", "A small, early relative of T. rex with a big crest on its head.", "I lived in China.", "My name means 'Crown Dragon'.", "I am the crested great-grandfather of the T-Rex."],
    ["Concavenator", "theropod", "Cretaceous", "A strange hunter with a pointy hump on its back.", "I lived in Spain.", "I may have had little feather bumps on my arms.", "I have a strange, shark-like fin just above my hips."],
    ["Qianzhousaurus", "theropod", "Cretaceous", "A tyrannosaur with a long, thin snout, nicknamed 'Pinocchio Rex'!", "I lived in China.", "I was a cousin of T. rex.", "People call me 'Pinocchio Rex' because of my long nose!"],
    ["Yutyrannus", "theropod", "Cretaceous", "The biggest dinosaur ever found that was covered in fluffy feathers.", "I lived in a cold, snowy part of China.", "My name means 'Feathered Tyrant'.", "I am a giant, fluffy relative of the T-Rex!"],

    // ---------- LONG-NECKS (SAUROPODOMORPHS) ----------
    ["Brachiosaurus", "sauropod", "Jurassic", "A super-tall giant whose front legs were longer than its back legs, like a giraffe.", "I ate leaves from the tops of tall trees.", "I was taller than a three-storey building.", "My nose was located on the very top of my head."],
    ["Diplodocus", "sauropod", "Jurassic", "A very long, slim giant with a tail it could crack like a whip!", "I had a long neck and an even longer tail.", "I had peg-shaped teeth for stripping leaves.", "I have a tail that can crack like a giant whip."],
    ["Brontosaurus", "sauropod", "Jurassic", "A famous long-necked dinosaur. Scientists took its name away and later gave it back!", "I was huge and walked on four legs.", "I am a close cousin of Apatosaurus.", "My name means 'Thunder Lizard'."],
    ["Argentinosaurus", "sauropod", "Cretaceous", "Maybe the heaviest land animal ever, as heavy as 10 elephants or more!", "I lived in Argentina.", "Each of my back bones was taller than a grown-up.", "I am the heaviest dinosaur ever discovered!"],
    ["Camarasaurus", "sauropod", "Jurassic", "A common long-necked dinosaur with a box-shaped head and spoon-shaped teeth.", "My neck was shorter than most of my cousins' necks.", "Lots of my fossils have been found in North America.", "I have a short, square snout and spoon-shaped teeth."],
    ["Mamenchisaurus", "sauropod", "Jurassic", "A dinosaur with an amazingly long neck, half as long as its whole body!", "I lived in China.", "I was a plant-eater with a tiny head.", "My neck is longer than a school bus!"],
    ["Saltasaurus", "sauropod", "Cretaceous", "A smaller long-necked dinosaur with bony armour on its back.", "I lived in Argentina.", "I was small for a long-necked dinosaur.", "I am a long-necked dinosaur with armor on my back."],
    ["Amargasaurus", "sauropod", "Cretaceous", "A long-necked dinosaur with two rows of tall spikes down its neck.", "I lived in Argentina.", "I had quite a short neck for a long-neck!", "I have two rows of spikes running all the way down my neck."],
    ["Plateosaurus", "sauropod", "Triassic", "An early plant-eater that walked on two legs, the great-grandparent of the giant long-necks.", "I lived in Europe.", "I had big claws on my thumbs.", "I am one of the very first long-necked plant eaters."],
    ["Massospondylus", "sauropod", "Jurassic", "An early, slim plant-eater that swallowed stones to help mash up its food.", "I lived in southern Africa.", "Scientists found my eggs with tiny babies still inside!", "I swallowed rocks to help mash up food in my tummy!"],
    ["Shunosaurus", "sauropod", "Jurassic", "A long-necked dinosaur with a spiky club at the end of its tail.", "I lived in China.", "I used my tail to protect myself.", "I have a heavy club on my tail like an Ankylosaurus."],
    ["Nigersaurus", "sauropod", "Cretaceous", "A funny long-neck with a flat mouth like a vacuum cleaner and hundreds of teeth!", "I lived in Africa, in a country called Niger.", "I grew new teeth all the time.", "My mouth is perfectly flat like a vacuum cleaner!"],
    ["Europasaurus", "sauropod", "Jurassic", "A mini long-necked dinosaur that lived on a small island.", "I lived in Germany.", "I was only about as big as a horse.", "I am a miniature long-necked dinosaur."],
    ["Mussaurus", "sauropod", "Triassic", "An early plant-eater called 'Mouse Lizard' because its first fossils were tiny babies.", "I lived in Argentina.", "Grown-ups like me were actually quite big!", "My name means 'Mouse Lizard' because my first fossils were tiny babies."],
    ["Riojasaurus", "sauropod", "Triassic", "A heavy, early plant-eater that walked on all four legs.", "I had a long neck and a long tail.", "I am named after a place called La Rioja.", "I am a heavy, early plant-eater from Argentina."],

    // ---------- DUCK-BILLS & BEAKS (ORNITHOPODS) ----------
    ["Iguanodon", "ornithopod", "Cretaceous", "A big, bulky plant-eater with a sharp spike on each thumb.", "I could walk on two legs or on four.", "I was one of the first dinosaurs ever discovered.", "I have a sharp, pointy spike on each of my thumbs."],
    ["Parasaurolophus", "ornithopod", "Cretaceous", "A duck-billed dinosaur with a long, hollow tube on its head.", "I had a beak like a duck.", "I lived in herds in North America.", "I use the long tube on my head to make loud, echoing calls."],
    ["Corythosaurus", "ornithopod", "Cretaceous", "A duck-billed dinosaur with a round crest like a helmet.", "I lived in big herds.", "My crest was hollow inside.", "My crest looks just like a gladiator's helmet."],
    ["Edmontosaurus", "ornithopod", "Cretaceous", "A huge duck-billed dinosaur with no crest that lived in giant herds.", "I had hundreds of teeth for chewing plants.", "T. rex liked to hunt me!", "I have a beak like a duck but no crest on my head."],
    ["Maiasaura", "ornithopod", "Cretaceous", "A duck-billed dinosaur that looked after its babies in big nesting groups.", "I made nests out of mud and plants.", "I brought food to my babies until they were big enough.", "My name means 'Good Mother Lizard'."],
    ["Muttaburrasaurus", "ornithopod", "Cretaceous", "A big Australian plant-eater with a hollow bump on its nose.", "I lived in Australia.", "I am named after a town in Queensland.", "I have a large, hollow bump on my nose to make loud noises."],
    ["Hypsilophodon", "ornithopod", "Cretaceous", "A small, nimble runner. People once thought it lived in trees!", "I was about the size of a dog.", "My fossils were found on the Isle of Wight.", "Scientists used to think I lived up in the trees!"],
    ["Ouranosaurus", "ornithopod", "Cretaceous", "A plant-eater with a tall sail on its back that lived near Spinosaurus.", "I lived in Africa.", "I had a flat beak like a duck.", "I am a plant-eater with a tall sail on my back."],
    ["Tsintaosaurus", "ornithopod", "Cretaceous", "A duck-billed dinosaur with a tall crest pointing up from its head.", "People used to call me the 'unicorn dinosaur'.", "I lived in China.", "I have a strange, tall crest pointing up from my forehead."],
    ["Leaellynasaura", "ornithopod", "Cretaceous", "A small dinosaur with big eyes that lived through dark, cold winters in the far south.", "I lived in Australia, near the South Pole.", "I am named after a little girl called Leaellyn.", "I have huge eyes to see in the dark winter."],
    ["Heterodontosaurus", "ornithopod", "Jurassic", "A small plant-eater with sharp fangs like a dog!", "I lived in South Africa.", "I had three different kinds of teeth.", "Even though I eat plants, I have sharp fangs like a dog!"],

    // ---------- HORNS & DOMES (MARGINOCEPHALIANS) ----------
    ["Triceratops", "margino", "Cretaceous", "A giant plant-eater with three horns on its face and a big bony frill.", "I lived at the same time as T. rex.", "I had a beak like a parrot.", "My name means 'Three-Horned Face'."],
    ["Styracosaurus", "margino", "Cretaceous", "A horned dinosaur with a frill covered in long spikes.", "I had one big horn on my nose.", "I lived in herds.", "I have a frill covered in long, dangerous spikes."],
    ["Protoceratops", "margino", "Cretaceous", "A sheep-sized dinosaur with a frill but no horns.", "I lived in the Gobi Desert.", "A famous fossil shows me fighting a Velociraptor!", "I have a frill but no horns on my face at all."],
    ["Pachycephalosaurus", "margino", "Cretaceous", "A dinosaur with a super-thick dome of bone on top of its head.", "I walked on two legs.", "I had little spikes around my dome.", "I have a skull as thick as a bowling ball!"],
    ["Pachyrhinosaurus", "margino", "Cretaceous", "A heavy plant-eater with a big flat bump on its nose instead of a horn.", "I lived in Alaska and Canada, where it was chilly.", "I had spikes on top of my frill.", "I have a giant, flat bump on my nose instead of a horn."],
    ["Psittacosaurus", "margino", "Cretaceous", "A small dinosaur with a parrot-like beak and bristles on its tail.", "I walked on two legs.", "I lived in Asia.", "My name means 'Parrot Lizard'."],
    ["Kosmoceratops", "margino", "Cretaceous", "A horned dinosaur with 15 horns and spikes on its head, the most of any dinosaur!", "My frill had a fringe of curly horns.", "I lived in Utah, USA.", "I have more horns on my head than any other dinosaur!"],
    ["Einiosaurus", "margino", "Cretaceous", "A horned dinosaur whose big nose horn curved forward like a hook.", "I lived in Montana, USA.", "I had two long spikes on my frill.", "My nose horn curves forward like a giant hook."],
    ["Stygimoloch", "margino", "Cretaceous", "A dome-headed dinosaur with big spikes on the back of its head.", "Some scientists think I am a young Pachycephalosaurus.", "I walked on two legs.", "I have a thick skull surrounded by sharp spikes."],
    ["Dracorex", "margino", "Cretaceous", "A spiky-headed dinosaur that looks just like a dragon!", "I had a flat head covered in spikes and bumps.", "Children visiting a museum helped choose my name.", "My name means 'Dragon King of Hogwarts'."],

    // ---------- ARMOURED (THYREOPHORANS) ----------
    ["Stegosaurus", "thyreo", "Jurassic", "A big plant-eater with tall plates along its back and spikes on its tail.", "My head was very small for my big body.", "I lived in North America.", "I have giant plates on my back and four spikes on my tail."],
    ["Ankylosaurus", "thyreo", "Cretaceous", "A walking tank! It was covered in armour and had a big club on its tail.", "I was low and wide, like a tank.", "I lived at the same time as T. rex.", "I am covered in armor and have a heavy club on my tail!"],
    ["Kentrosaurus", "thyreo", "Jurassic", "A spiky cousin of Stegosaurus with long spikes down its back and tail.", "I lived in Africa.", "I had long spikes on my shoulders too.", "I have plates on my front half and sharp spikes on my back half."],
    ["Borealopelta", "thyreo", "Cretaceous", "A spiky armoured dinosaur whose fossil is so perfect it looks like a statue.", "Miners digging in Canada found my fossil.", "Scientists even know I was reddish-brown.", "My fossil was found perfectly preserved, like a statue!"],
    ["Scelidosaurus", "thyreo", "Jurassic", "An early plant-eater covered in rows of bony bumps.", "My fossils were found in England.", "I walked on four legs.", "I am one of the earliest known armored dinosaurs."],

    // ---------- FLYING REPTILES (PTEROSAURS) ----------
    ["Pteranodon", "pterosaur", "Cretaceous", "A giant flying reptile with a long crest on its head and no teeth.", "My wings were wider than a car is long.", "I flew over the sea to catch fish.", "I am a giant flying reptile with no teeth."],
    ["Quetzalcoatlus", "pterosaur", "Cretaceous", "One of the biggest flying animals ever. It was as tall as a giraffe when standing!", "I walked on the ground to catch small animals, like a giant stork.", "My wings were as wide as a small plane's.", "I am a flying reptile as tall as a giraffe!"],
    ["Pterodactylus", "pterosaur", "Jurassic", "A small flying reptile that caught fish and bugs.", "I was the first flying reptile ever discovered.", "I had a long, thin beak full of small teeth.", "My name is famous, but I am actually quite small!"],
    ["Dimorphodon", "pterosaur", "Jurassic", "A flying reptile with a big, heavy head and a long tail.", "I had two different kinds of teeth.", "Mary Anning found my fossil in England.", "I have a giant head for a flying reptile and a long tail."],
    ["Tapejara", "pterosaur", "Cretaceous", "A flying reptile with a huge, colourful crest on its face.", "I had a short, curved beak.", "I lived in Brazil and may have eaten fruit.", "I have a giant, beautiful crest on the front of my face."],

    // ---------- SEA REPTILES (MARINE REPTILES) ----------
    ["Mosasaurus", "marine", "Cretaceous", "A giant sea reptile with powerful jaws that ruled the oceans.", "I had an extra row of teeth on the roof of my mouth!", "I had flippers and a tail like a shark's.", "I am a giant sea monster that ate whatever I wanted!"],
    ["Plesiosaurus", "marine", "Jurassic", "A sea reptile with a long neck, four flippers and a small head.", "I lived in the seas around England.", "Mary Anning found my first skeleton.", "I have four flippers and a super long neck."],
    ["Ichthyosaurus", "marine", "Jurassic", "A fast-swimming sea reptile that looked like a dolphin.", "I had giant eyes for seeing underwater.", "My babies were born in the sea, not from eggs.", "I am a reptile, but I look just like a dolphin!"],
    ["Elasmosaurus", "marine", "Cretaceous", "A sea reptile with an amazingly long neck, with more than 70 neck bones!", "I swam with four big flippers.", "I lived in a sea that covered the middle of North America.", "My neck is so long it makes up half of my body!"],
    ["Kronosaurus", "marine", "Cretaceous", "A huge, short-necked sea hunter with teeth as big as bananas.", "My head was nearly as long as a grown-up is tall.", "I lived in the seas around Australia.", "I am a giant sea hunter with teeth as big as bananas!"]
];

// Dinosaurs taken out of the app to keep the list short and the pictures easy to tell apart
// (most are close look-alikes of one that is still in). They are NOT shown in the app.
// To bring one back, move its line up into DINO_ROWS above, and move its picture from tools/extra-images/ into dino-images/.
const DINO_EXTRA_ROWS = [
    ["Albertosaurus", "theropod", "Cretaceous", "A slimmer, faster cousin of T. rex that may have hunted in groups.", "I am in the same family as T. rex.", "Lots of my fossils were found together, so I may have lived in a group.", "I am a tyrannosaur named after a province in Canada."],
    ["Tarbosaurus", "theropod", "Cretaceous", "The top hunter of ancient Asia. It looked a lot like T. rex!", "I had tiny arms with just two fingers.", "My fossils were found in the Gobi Desert.", "I am the Asian cousin of the Tyrannosaurus rex."],
    ["Majungasaurus", "theropod", "Cretaceous", "A chunky hunter from Madagascar with a little horn on its head.", "I had a short, wide face.", "I had one small bump-horn on top of my head.", "I was the top predator on the island of Madagascar."],
    ["Suchomimus", "theropod", "Cretaceous", "A big fish-eating dinosaur with a long, narrow snout like a crocodile.", "I had a low ridge along my back.", "I lived next to rivers in Africa.", "My name means 'Crocodile Mimic'."],
    ["Carcharodontosaurus", "theropod", "Cretaceous", "A gigantic hunter with teeth shaped like a great white shark's!", "I was one of the biggest meat-eaters ever.", "I lived in North Africa.", "My name means 'Shark-Toothed Lizard'."],
    ["Ornithomimus", "theropod", "Cretaceous", "A speedy dinosaur with no teeth, built for running fast.", "I was covered in feathers.", "I had a beak and ate plants and small animals.", "My name means 'Bird Mimic'."],
    ["Struthiomimus", "theropod", "Cretaceous", "A long-legged dinosaur that ran away from danger super fast.", "I had long legs and a long tail.", "I ran fast to escape hungry hunters.", "My name means 'Ostrich Mimic'."],
    ["Monolophosaurus", "theropod", "Jurassic", "A medium-sized hunter with one long crest along the top of its snout.", "I lived in China.", "My crest was hollow inside.", "I have one long crest on the top of my head."],
    ["Mapusaurus", "theropod", "Cretaceous", "A huge hunter that may have worked in groups to catch giant long-necked dinosaurs.", "Lots of my fossils were found together.", "I lived in Argentina.", "I hunted the largest dinosaurs in South America."],
    ["Daspletosaurus", "theropod", "Cretaceous", "A heavy, powerful cousin of T. rex.", "I lived in North America before T. rex did.", "I had big, strong jaws.", "My name means 'Frightful Lizard'."],
    ["Gorgosaurus", "theropod", "Cretaceous", "A quick and nimble cousin of T. rex.", "I had little crests above my eyes.", "I lived in Canada.", "My name means 'Dreadful Lizard'."],
    ["Alioramus", "theropod", "Cretaceous", "A slim tyrannosaur with a long snout and bumps on its nose.", "I was a cousin of T. rex.", "I lived in Mongolia.", "I am a slender tyrannosaur with a bumpy snout."],
    ["Proceratosaurus", "theropod", "Jurassic", "A small, early relative of T. rex with a little crest on its nose.", "My fossil was found in England.", "I had a small horn-like crest on my nose.", "I was originally thought to be an ancestor of Ceratosaurus."],
    ["Neovenator", "theropod", "Cretaceous", "A sleek, fast hunter found in Britain.", "My fossils were found on the Isle of Wight.", "My name means 'New Hunter'.", "I am one of the best-known predators from ancient Britain."],
    ["Irritator", "theropod", "Cretaceous", "A fish-eating dinosaur. Fossil sellers glued bits onto its skull, which really irritated the scientists!", "I had a long snout for catching fish.", "I lived in Brazil.", "My skull was completely changed by fossil sellers!"],
    ["Dromaeosaurus", "theropod", "Cretaceous", "A small, tough raptor with a very strong bite.", "I had a big claw on each foot.", "My name means 'Running Lizard'.", "I am the raptor that gave my family its name."],
    ["Rugops", "theropod", "Cretaceous", "A medium-sized hunter with a wrinkly, bumpy face.", "I lived in Africa.", "I may have eaten leftovers from other dinosaurs.", "My name means 'Wrinkle Face'."],
    ["Saurornithoides", "theropod", "Cretaceous", "A smart hunter with big eyes for hunting when it was getting dark.", "I was a cousin of Troodon.", "I lived in Mongolia.", "I have very large eyes for hunting at dusk."],
    ["Bambiraptor", "theropod", "Cretaceous", "A tiny, bird-like raptor named after Bambi, the cartoon deer!", "A 14-year-old boy found my fossil.", "I was small and covered in feathers.", "I am a tiny raptor named after a famous movie deer."],
    ["Sinornithosaurus", "theropod", "Cretaceous", "A feathered raptor. Some scientists think it might have had a venomous bite!", "I lived in China.", "I had feathers and a curved toe-claw.", "Some scientists think I might have had venom like a snake."],
    ["Austroraptor", "theropod", "Cretaceous", "A big raptor with very short arms and a long snout.", "I probably liked to eat fish.", "I lived in Argentina.", "I am a giant raptor from South America with tiny arms."],
    ["Zhuchengtyrannus", "theropod", "Cretaceous", "A huge tyrannosaur from China, nearly as big as T. rex.", "I had big, sharp teeth.", "I was a close cousin of Tarbosaurus.", "I was a giant apex predator in ancient China."],
    ["Pelecanimimus", "theropod", "Cretaceous", "A fast runner with more than 200 tiny teeth!", "I lived in Spain.", "I may have had a pouch under my chin like a pelican.", "I have more teeth than any of my ostrich-like cousins."],
    ["Apatosaurus", "sauropod", "Jurassic", "A heavy, long-necked plant-eater with a thick, strong neck.", "I was as heavy as several elephants.", "I ate plants all day long.", "I was once mistakenly called Brontosaurus."],
    ["Dreadnoughtus", "sauropod", "Cretaceous", "A gigantic long-necked dinosaur. Its name means 'fears nothing'!", "I was as heavy as a big jet plane.", "I lived in Argentina.", "I am so big that my name means 'I fear nothing'."],
    ["Patagotitan", "sauropod", "Cretaceous", "One of the biggest dinosaurs ever, a giant from Patagonia.", "A copy of my skeleton is so big its head pokes out of the museum room!", "I had a very long neck and ate plants.", "I am a colossal titan from ancient Patagonia."],
    ["Supersaurus", "sauropod", "Jurassic", "One of the longest dinosaurs ever, almost as long as three buses!", "I was a cousin of Diplodocus.", "I lived in North America.", "My name literally means 'Super Lizard'."],
    ["Giraffatitan", "sauropod", "Jurassic", "A huge, tall dinosaur that used to be called Brachiosaurus.", "My skeleton stands in a museum in Berlin.", "My front legs were longer than my back legs.", "I was built very similarly to a modern giraffe."],
    ["Alamosaurus", "sauropod", "Cretaceous", "The only giant titanosaur known from North America.", "I lived at the same time as T. rex.", "I had a long neck and a long tail.", "I am the largest dinosaur found in North America."],
    ["Barosaurus", "sauropod", "Jurassic", "A cousin of Diplodocus with an extra-long neck.", "I lived in North America.", "I had a long, whip-like tail.", "I look like Diplodocus but with an extra-long neck."],
    ["Dicraeosaurus", "sauropod", "Jurassic", "A smaller long-necked dinosaur with a short neck and tall spines on its back.", "I lived in Africa.", "The spines on my back were split in two, like a Y.", "I am a long-necked dinosaur with a surprisingly short neck."],
    ["Seismosaurus", "sauropod", "Jurassic", "A super-long dinosaur that scientists now think was a really big Diplodocus.", "I was one of the longest dinosaurs ever.", "I lived in North America.", "My name means 'Earth-Shaking Lizard'."],
    ["Sauroposeidon", "sauropod", "Cretaceous", "A super-tall long-necked dinosaur named after the Greek god of earthquakes.", "My head could reach as high as a six-storey building.", "I lived in North America.", "I am named after the god of earthquakes and the sea."],
    ["Paralititan", "sauropod", "Cretaceous", "A massive long-necked dinosaur that lived in swamps near the sea.", "I lived in Egypt.", "I was one of the biggest dinosaurs in Africa.", "I was a giant plant-eater that lived near the ocean."],
    ["Cetiosaurus", "sauropod", "Jurassic", "The first long-necked dinosaur ever found. Scientists first thought it was a giant whale!", "My fossils were found in England.", "My name means 'Whale Lizard'.", "Scientists originally thought I was a giant fossilized whale!"],
    ["Magyarosaurus", "sauropod", "Cretaceous", "A tiny titanosaur that stayed small because it lived on an island.", "I lived in Romania.", "I was only about as big as a horse.", "I am a tiny titan from ancient Europe."],
    ["Vulcanodon", "sauropod", "Jurassic", "One of the first true long-necked giants.", "I lived in Zimbabwe in Africa.", "My fossil was found between old volcano rocks.", "My name means 'Volcano Tooth'."],
    ["Omeisaurus", "sauropod", "Jurassic", "A long-necked dinosaur from China with a very, very long neck.", "I am named after a mountain in China.", "I ate leaves from tall trees.", "I lived in ancient China and had a very long neck."],
    ["Melanorosaurus", "sauropod", "Triassic", "A big early plant-eater, one of the first to walk on all fours.", "I lived in South Africa.", "My name means 'Black Mountain Lizard'.", "I was one of the first plant-eaters to walk on all fours."],
    ["Hadrosaurus", "ornithopod", "Cretaceous", "The first nearly complete dinosaur skeleton ever put together in a museum.", "I had a beak like a duck.", "My fossils were found in New Jersey, USA.", "I was the first dinosaur ever put on display in a museum."],
    ["Lambeosaurus", "ornithopod", "Cretaceous", "A big duck-billed dinosaur with a crest shaped like an axe.", "I lived in Canada.", "I ate plants and lived in herds.", "I have a crest on my head shaped like a small axe."],
    ["Dryosaurus", "ornithopod", "Jurassic", "A fast plant-eater that ran on two legs to escape hungry hunters.", "I had a beak and long legs.", "I lived in North America.", "My name means 'Oak Tree Lizard'."],
    ["Orodromeus", "ornithopod", "Cretaceous", "A small, fast plant-eater that may have dug burrows for its babies.", "I lived in Montana, USA.", "I ran fast on two legs.", "My name means 'Mountain Runner'."],
    ["Tenontosaurus", "ornithopod", "Cretaceous", "A medium-sized plant-eater with a super-long, heavy tail.", "Deinonychus liked to hunt me.", "I walked on two legs or on four.", "My tail makes up more than half of my total body length."],
    ["Camptosaurus", "ornithopod", "Jurassic", "A heavy plant-eater with a beak, related to Iguanodon.", "I lived in North America.", "I could walk on two legs or on four.", "My name means 'Flexible Lizard'."],
    ["Shantungosaurus", "ornithopod", "Cretaceous", "The biggest duck-billed dinosaur ever, almost as big as a long-neck!", "I lived in China.", "I was as long as a bus.", "I am the biggest duck-billed dinosaur ever discovered."],
    ["Lesothosaurus", "ornithopod", "Jurassic", "A small, light, early plant-eater from southern Africa.", "I am named after the country Lesotho.", "I ran fast on two legs.", "I am a tiny, fast plant-eater from ancient Africa."],
    ["Centrosaurus", "margino", "Cretaceous", "A horned dinosaur with one big nose horn and hooks on its frill.", "I lived in huge herds in Canada.", "I had a beak like a parrot.", "I have one big horn on my nose and little hooks on my frill."],
    ["Chasmosaurus", "margino", "Cretaceous", "A horned dinosaur with a giant frill shaped a bit like a heart.", "I had short horns above my eyes.", "I lived in Canada.", "My giant frill had large holes covered by skin."],
    ["Microceratus", "margino", "Cretaceous", "One of the smallest horned dinosaurs, and it walked on two legs!", "I was about as big as a cat.", "I lived in Asia.", "I am a tiny horned dinosaur that hops on two legs."],
    ["Zuniceratops", "margino", "Cretaceous", "An early horned dinosaur with horns above its eyes.", "An 8-year-old boy found my fossil!", "I lived in New Mexico, USA.", "I was the first of my family to grow horns above my eyes."],
    ["Diabloceratops", "margino", "Cretaceous", "A horned dinosaur with two long, devil-like spikes on its frill.", "I lived in Utah, USA.", "I had a beak like a parrot.", "My name means 'Devil-Horned Face'."],
    ["Nasutoceratops", "margino", "Cretaceous", "A horned dinosaur with a big nose and horns like a bull's.", "I had a very big nose.", "I lived in Utah, USA.", "My horns point forward and look just like a cow's horns."],
    ["Stegoceras", "margino", "Cretaceous", "A small, quick dome-headed dinosaur that lived in herds.", "I walked on two legs.", "I lived in North America.", "I am a small dinosaur with a thick, round helmet built into my skull."],
    ["Homalocephale", "margino", "Cretaceous", "A thick-headed dinosaur with a flat head instead of a dome.", "I lived in Mongolia.", "I walked on two legs.", "I have a thick skull, but it is completely flat on top!"],
    ["Euoplocephalus", "thyreo", "Cretaceous", "An armoured dinosaur. Even its eyelids had bone in them!", "I had a club on the end of my tail.", "I lived in Canada.", "Even my eyelids were made of bone!"],
    ["Nodosaurus", "thyreo", "Cretaceous", "An armoured plant-eater covered in bony bumps, with no tail club.", "I lived in North America.", "I was low to the ground like a tank.", "I am covered in armor, but I do not have a club on my tail."]
];
