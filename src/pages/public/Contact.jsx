import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";


export default function Contact() {

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      text: "Luxury Avenue, Dubai, UAE",
    },
    {
      icon: Phone,
      title: "Phone",
      text: "+971 123 456 789",
    },
    {
      icon: Mail,
      title: "Email",
      text: "info@luxurystay.com",
    },
    {
      icon: Clock,
      title: "Working Hours",
      text: "Open 24 Hours • 7 Days a Week",
    },
  ];


  return (

    <div>


      {/* HERO */}


      <section
        className="min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
          "linear-gradient(rgba(7,40,43,.7),rgba(7,40,43,.7)),url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070')",
        }}
      >


        <div className="container text-center text-white">


          <span className="hero-badge">
            CONTACT LUXURYSTAY
          </span>



          <h1 className="hero-title mt-8">
            Let's Create
            <br />
            A <span>Perfect Stay</span>
          </h1>



          <p className="hero-text mt-8">

            Have questions, booking requests or special
            requirements? Our hospitality team is available
            anytime to assist you.

          </p>


        </div>


      </section>





      {/* CONTACT SECTION */}


      <section className="py-24">


        <div className="container grid lg:grid-cols-2 gap-14">


          {/* INFORMATION */}


          <div>


            <span
              className="text-sm tracking-[.3em]"
              style={{
                color:"var(--secondary)"
              }}
            >
              GET IN TOUCH
            </span>



            <h2 className="section-title text-left mt-5">
              We're Here To Help
            </h2>



            <p className="text-gray-600 leading-8 mb-10">

              Whether you need assistance with reservations,
              services or general information, our team is
              always ready to provide exceptional support.

            </p>





            <div className="space-y-6">


              {contactInfo.map((item)=>{


                const Icon=item.icon;


                return (

                  <div
                    key={item.title}
                    className="card flex items-center gap-5"
                  >

                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full"
                      style={{
                        background:"#f2d08d"
                      }}
                    >

                      <Icon
                        size={30}
                        style={{
                          color:"#0f3d3e"
                        }}
                      />

                    </div>



                    <div>

                      <h3 className="text-xl mb-2">
                        {item.title}
                      </h3>


                      <p className="text-gray-600">
                        {item.text}
                      </p>


                    </div>


                  </div>

                );


              })}


            </div>


          </div>





          {/* FORM */}


          <div className="card">


            <h2 className="text-3xl mb-8">
              Send A Message
            </h2>



            <form className="space-y-6">


              <div>

                <label className="block mb-2 font-medium">
                  Full Name
                </label>


                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border p-4 outline-none focus:border-[#0f3d3e]"
                />


              </div>




              <div>

                <label className="block mb-2 font-medium">
                  Email Address
                </label>


                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border p-4 outline-none focus:border-[#0f3d3e]"
                />


              </div>




              <div>

                <label className="block mb-2 font-medium">
                  Subject
                </label>


                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full rounded-xl border p-4 outline-none focus:border-[#0f3d3e]"
                />


              </div>




              <div>

                <label className="block mb-2 font-medium">
                  Message
                </label>


                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full rounded-xl border p-4 outline-none focus:border-[#0f3d3e]"
                />


              </div>




              <button
                className="btn-primary w-full flex items-center justify-center gap-3"
              >

                <Send size={20}/>
                Send Message

              </button>



            </form>


          </div>


        </div>


      </section>






      {/* MAP */}


      <section className="pb-24">


        <div className="container">


          <div
            className="rounded-3xl h-[400px] flex items-center justify-center text-center text-white"
            style={{
              background:"#0f3d3e"
            }}
          >


            <div>


              <MapPin
                size={60}
                className="mx-auto"
                style={{
                  color:"var(--secondary)"
                }}
              />


              <h2 className="hero-title text-4xl mt-6">
                Find Us Easily
              </h2>


              <p className="hero-text mt-4">
                Google Maps integration can be added here.
              </p>


            </div>


          </div>


        </div>


      </section>



    </div>

  );
}