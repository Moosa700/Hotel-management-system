import {
  BedDouble,
  UtensilsCrossed,
  Wifi,
  Dumbbell,
  Waves,
  Car,
  Coffee,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: BedDouble,
    title: "Luxury Rooms",
    description:
      "Spacious and elegant rooms equipped with premium facilities for maximum comfort.",
  },
  {
    icon: UtensilsCrossed,
    title: "Fine Dining",
    description:
      "Enjoy world-class cuisine prepared by experienced chefs with international flavors.",
  },
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi",
    description:
      "Stay connected throughout the hotel with complimentary high-speed internet.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description:
      "Modern gym equipped with advanced fitness equipment available 24/7.",
  },
  {
    icon: Waves,
    title: "Swimming Pool & Spa",
    description:
      "Relax in our luxurious pool and rejuvenate with premium spa treatments.",
  },
  {
    icon: Car,
    title: "Airport Shuttle",
    description:
      "Convenient airport pickup and drop-off service for our guests.",
  },
  {
    icon: Coffee,
    title: "24/7 Room Service",
    description:
      "Enjoy delicious meals and refreshments anytime during your stay.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "24/7 security, CCTV monitoring, and secure access for complete peace of mind.",
  },
];


export default function Services() {

  return (

    <div>


      {/* HERO */}

      <section
        className="min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
          "linear-gradient(rgba(7,40,43,.7),rgba(7,40,43,.7)),url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070')",
        }}
      >

        <div className="container text-center text-white">


          <span className="hero-badge">
            LUXURYSTAY SERVICES
          </span>



          <h1 className="hero-title mt-8">
            Exceptional Services
            <br />
            For A <span>Perfect Stay</span>
          </h1>



          <p className="hero-text mt-8">

            Discover premium hospitality services designed
            to provide comfort, luxury and unforgettable
            experiences for every guest.

          </p>


        </div>


      </section>





      {/* SERVICES */}


      <section className="py-24">


        <div className="container">


          <div className="text-center mb-14">


            <h2 className="section-title">
              Everything You Need,
              Under One Roof
            </h2>


            <p className="section-subtitle">

              From luxury accommodation to wellness and
              dining experiences, we provide everything
              required for a memorable stay.

            </p>


          </div>





          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">


            {services.map((service)=>{


              const Icon = service.icon;


              return (

                <div
                  key={service.title}
                  className="card text-center"
                >


                  <div
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                    style={{
                      background:"#f2d08d"
                    }}
                  >

                    <Icon
                      size={38}
                      style={{
                        color:"#0f3d3e"
                      }}
                    />

                  </div>




                  <h3 className="text-xl mb-4">
                    {service.title}
                  </h3>



                  <p className="text-gray-600 leading-7">
                    {service.description}
                  </p>


                </div>

              );


            })}


          </div>


        </div>


      </section>






      {/* CTA */}


      <section
        className="py-24"
        style={{
          background:"#0f3d3e"
        }}
      >


        <div className="container text-center">


          <span className="hero-badge">
            LUXURY EXPERIENCE
          </span>



          <h2 className="hero-title mt-8">
            Experience Luxury
            <br />
            Like Never Before
          </h2>



          <p className="hero-text mt-8">

            Whether you are traveling for business or leisure,
            LuxuryStay provides exceptional hospitality,
            premium services and unforgettable experiences.

          </p>




          <button className="btn-primary mt-10">
            Book Your Stay
          </button>


        </div>


      </section>



    </div>

  );
}