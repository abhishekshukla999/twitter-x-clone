import { Select, LoadingModal } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { profileService } from "../../../../appwrite";
import { addProfileData } from "../../../../features/profile/profileSlice";
import { useState } from "react";
import { toast } from "sonner";
import { SettingItemsContainer, BackButton } from "../../../";

function CountryChange() {
    const authData = useSelector((state) => state.auth.userData);
    const profileData = useSelector((state) => state.profile);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            country: profileData?.country || "",
        },
    });
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands",
    ];

    const changeCountry = async (data) => {
        setLoading(true);

        if (authData) {
            try {
                const updatedProfileData = await profileService.updateProfile(
                    profileData?.$id,
                    {
                        country: data?.country || "",
                    }
                );

                if (updatedProfileData) {
                    dispatch(addProfileData(updatedProfileData));
                }

                toast.success("Country changed successfully !!");
            } catch (error) {
                // console.log("Error updating country :: ", error);
                toast.error("Country changing failed !!");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <SettingItemsContainer>
                <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                    <div className="flex gap-5">
                        <BackButton />
                        <div className="font-bold text-xl py-3">
                            Change country
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(changeCountry)}>
                    <div className="border-b dark:border-gray-800 dim:border-gray-800 py-4 px-3">
                        <Select
                            label="Country"
                            options={countryList}
                            {...register("country")}
                        />
                    </div>
                    <div className="my-1 box-border">
                        <div className="px-4 text-[13px] text-gray-500">
                            This is the primary country associated with your
                            account. Your country helps us to customize your X
                            experience.{" "}
                            <span className="hover:underline text-twitter-blue hover:text-sky-600 yellow:text-twitter-yellow yellow:hover:text-yellow-600 crimson:text-twitter-crimson crimson:hover:text-rose-600 purple:text-twitter-purple purple:hover:text-purple-600 orange:text-twitter-orange orange:hover:text-orange-600 green:text-twitter-green green:hover:text-green-600 cursor-pointer">
                                Learn more
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-end px-2 py-3">
                        <button
                            type="submit"
                            className="py-1.5 px-4 text-white font-bold rounded-full bg-twitter-blue hover:bg-sky-600 yellow:bg-twitter-yellow yellow:hover:bg-yellow-600 crimson:bg-twitter-crimson crimson:hover:bg-rose-600 purple:bg-twitter-purple purple:hover:bg-purple-600 orange:bg-twitter-orange orange:hover:bg-orange-600 green:bg-twitter-green green:hover:bg-green-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </SettingItemsContainer>

            <LoadingModal isOpen={loading} />
        </>
    );
}

export default CountryChange;
