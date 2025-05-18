// import UserProfileCard from "@/components/ui/UserProfileCard";

export default function About() {
  return (
    <div
      id="about"
      className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-orange-50 via-white to-yellow-50"
      style={{
        backgroundImage: "url('/Artboard.png')",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div
          className="rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 lg:p-8"
          style={{
            backgroundImage: "url('/Artboard.png')",
          }}
        >
          {/* Limitations Section */}
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            About us
          </h1>
          <div className="prose max-w-none text-sm sm:text-base">
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <span className="font-normal">
                 Bhutan has over 19 spoken dialects and it is known for richness of the
                  linguistic diversity and polyglot country where in Bhutanese can speak more
                   than one dialect. Aside from Dzongkha being national language, Tshanglakha or
                    also called as Sharchopkha is popularly spoken in the country. It is primarily
                     spoken in the eastern parts of the country and considered as native tongue to
                      Mongar, Trashigang, Pemagatshel, and Samdrupjongkar districts. The language is
                       also used by radio stations and music industry since it is widely spoken in other
                        parts of the country too (Druk Asia). For Bhutan, preservation of local dialects 
                        is pivotal to maintain cultural heritage, particularly Tshanglakha being spoken 
                        by majority of the people in the country. In this study, direct speech-to-speech 
                        model (S2UT) was used to develop Tshanglakha and English speech-to-speech
                         translation system. During the study it was discovered that lack of real-time
                          translation system creates digital divides and hinders communication and socialization 
                          affecting local communities and tourism industry. 
                           Since Tshanglakha has no written form, direct speech-to-speech translation
                            system would help to bridge the gap and promote cultural exchange. However, it is 
                            important to note that, Tshanglakha is a low resource language without having written form, 
                            preparing dataset from scratch was tedious and difficult. Therefore, the model was fine-tuned on 
                            Dzongkha and English Speech to Unit Translation System using 6000.00 datasets. 
                </span>
              </li>
             
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}