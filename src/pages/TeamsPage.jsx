import React from 'react';
import clsx from 'clsx';
import IMAGES from '../assets/images/image'; // Adjust path if needed

const Team = () => {
  const teamMembers = [
    {
      name: "Emmy Rosum",
      role: "Founder",
      image: "https://img.freepik.com/free-photo/young-businesswoman-holding-digital-tablet-mobile-phone_329181-11723.jpg",
    },
    {
      name: "Nandon Manek",
      role: "Project Director",
      image: "https://img.freepik.com/free-photo/portrait-indian-happy-businessman-using-laptop-computer-office_231208-2581.jpg",
    },
    {
      name: "Hana Mira",
      role: "Project Advisor",
      image: "https://img.freepik.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-smiling-professional-businesswoman-real-estate-broker-showing-clients-good-deal-carry-laptop-hand_1258-59121.jpg",
    },
    {
      name: "Jitendra",
      role: "Project Leader",
      image: "https://s3-alpha-sig.figma.com/img/7d23/915f/5e8913064ed4e6da4633494fd00451e2?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fzgMS1EOpcDvEI1xh6~656-TIlDJ9t35gxWOQPXf78t--nIod909JdnxkQpEJ4XEImKm2MT7YAyYcsI~u4Yk9VciGAiKbxBnSJRt28IQajM8G7M628AY~XpFLjppkEyMDBhj0zTt~LLaE2empfa~-leXgdnzVrJOh4HmhqTVCqw0JsNjYbo3TOzOq5wXyHWN456VjYTZZMqw9QXDuAOz1S3p9bDfDXuw-CDziqvGU1sXhETdC4EAFpawnexS4tC3j57cOJAHyReiytgUsR2fw7w4fiP05c-MaNByQCn2V2ccv~82jWdSwdoVZbtqM7iub0nAwtlINSYntqhd6cVgdw__",
    },
    {
      name: "William Henry",
      role: "Project Leader",
      image: "https://img.freepik.com/free-photo/portrait-smiling-businessman-using-digital-tablet-waiting-area_107420-95802.jpg",
    },
    {
      name: "Emily Rose",
      role: "Project Leader",
      image: "https://img.freepik.com/free-photo/portrait-beautiful-dreaming-employee_496169-2536.jpg",
    },
    {
      name: "Sophie Anne",
      role: "Asst Project Leader",
      image: "https://img.freepik.com/free-photo/brunette-businesswoman-posing_23-2148142767.jpg",
    },
    {
      name: "Emmy Rosum",
      role: "Asst Project Leader",
      image: "https://img.freepik.com/free-photo/confident-entrepreneur-looking-camera-with-arms-folded-smiling_1098-18840.jpg",
    },
  ];

  return (
    <div className={clsx("min-h-screen flex flex-col")}>
      {/* Hero Section */}
      <section className={clsx("bg-orange-500 py-16 text-white")}>
        <div className={clsx("max-w-6xl mx-auto px-4")}>
          <h1 className={clsx("text-4xl font-bold mb-2")}>Our Team</h1>
          <p className={clsx("text-xl mb-8")}>
            Meet the heroes behind our Success
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className={clsx("flex-grow py-10 bg-white")}>
        <div className={clsx("max-w-6xl mx-auto px-4")}>
          <div className={clsx("grid grid-cols-1 md:grid-cols-4 gap-6")}>
            {teamMembers.map((member, index) => (
              <div key={index} className={clsx("text-center")}>
                <img
                  src={member.image}
                  alt={member.name}
                  className={clsx("w-full h-64 object-cover rounded-md mb-4")}
                />
                <h3 className={clsx("text-lg font-bold text-gray-800 mb-1")}>
                  {member.name}
                </h3>
                <p className={clsx("text-gray-600")}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;