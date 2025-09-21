"use client"
import copy from 'copy-to-clipboard';
import Image from "next/image";
import { useState } from "react";
import { app, getAnalytics, logEvent } from '../../../firebase';
import { DataAll } from '../../data/DataAll';
import { DataAR } from '../../data/DataAR';
import { DataAT } from '../../data/DataAT';
import { DataBE } from '../../data/DataBE';
import { DataBG } from '../../data/DataBG';
import { DataBR } from '../../data/DataBR';
import { DataCA } from '../../data/DataCA';
import { DataCH } from '../../data/DataCH';
import { DataCL } from '../../data/DataCL';
import { DataCO } from '../../data/DataCO';
import { DataCZ } from '../../data/DataCZ';
import { DataDE } from '../../data/DataDE';
import { DataDK } from '../../data/DataDK';
import { DataES } from '../../data/DataES';
import { DataFI } from '../../data/DataFI';
import { DataFR } from '../../data/DataFR';
import { DataGB } from '../../data/DataGB';
import { DataGR } from '../../data/DataGR';
import { DataHR } from '../../data/DataHR';
import { DataHU } from '../../data/DataHU';
import { DataIE } from '../../data/DataIE';
import { DataIT } from '../../data/DataIT';
import { DataLT } from '../../data/DataLT';
import { DataLV } from '../../data/DataLV';
import { DataMX } from '../../data/DataMX';
import { DataNL } from '../../data/DataNL';
import { DataNO } from '../../data/DataNO';
import { DataPE } from '../../data/DataPE';
import { DataPL } from '../../data/DataPL';
import { DataPT } from '../../data/DataPT';
import { DataRO } from '../../data/DataRO';
import { DataSE } from '../../data/DataSE';
import { DataSI } from '../../data/DataSI';
import { DataSK } from '../../data/DataSK';
import { DataUA } from '../../data/DataUA';
import { DataUS } from '../../data/DataUS';

const BASE_URL = "https://api.awin.com/publisher";
const asin = 'B07ZQS94VJ';
const publisherId = '1533377';
const token = '4d355160-2634-49e3-9892-d803a96c133a';
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

const advertiserIds = [
        1478, 2495, 16062, 12428, 13470, 18822, 24958, 37532, 42927, 32475, 27634, 22235, 23202, 24408, 21407, 28349, 30171, 31335, 31499, 31471, 53679, 67066, 32633, 37054, 51935, 40342, 40512, 47069, 62441, 17207, 32471, 32461, 54347, 61929, 64852, 64216, 65968, 67702, 32211, 20039, 58169, 24757, 21206, 15184, 13054, 7138, 18823, 19765, 20134, 22267, 22343, 31077, 24996, 25243, 25686, 26997, 29703, 23548, 49545, 51379, 51381, 52015, 52405, 53957, 55351, 31740, 32531, 33073, 37352, 45779, 34901, 37052, 37048, 39732, 39736, 60481, 61325, 65356, 65758, 65986, 68578, 69478, 70208,55613, 72139, 53273, 22362, 27399, 26577, 24802, 12301, 15245, 15292, 15596, 31101, 31313, 32219, 32585, 34679, 34579, 26521, 28621, 28831, 20130, 19770, 21465, 18808, 20801, 23037, 23249, 36900, 37520, 50397, 53159, 70500, 70420, 58479, 71375, 6825, 64248, 70058, 62463, 15380, 16673, 2694, 28849, 27568, 29483, 29613, 29999, 22293, 23696, 44387, 38896, 39814, 22427, 23275, 24005, 24111, 25940, 27143, 27283, 27636, 30513, 30995, 47151, 50221, 51377, 4282, 6804, 53171, 44635, 26560, 22751, 59925, 60347, 66760, 69222, 69384, 12430, 35435, 46483, 46377, 48973, 50991, 33127, 37952, 39294, 42800, 57461, 161, 29569, 29727, 28629, 38660, 32565, 50533, 1552, 24374, 15371, 18715, 10573, 12426, 23294, 31413, 69996, 24273, 49561, 53891, 61043, 62187, 69560, 44733, 53271, 36302, 27227, 19198
];

interface Response {
    data: [
        {
            promotionId: number,
            type: string,
            advertiser: {
                id: number,
                name: string,
                joined: boolean
            },
            title: string,
            description: string,
            terms: string,
            startDate: string,
            endDate: string,
            url: string,
            urlTracking: string,
            dateAdded: string,
            campaign: string,
            regions: {
                all: boolean,
                list: [
                    {
                        name: string,
                        countryCode: string
                    }
                ]
            },
            voucher: {
                code: string,
                exclusive: boolean,
                attributable: boolean
            }
        }
    ],
    pagination: {
        page: number,
        pageSize: number,
        total: number
    }
}

const MultipleItems = () => {
    const [products, setProducts] = useState(DataAll); //[Response]);
    const [election, setElection] = useState();
    const [country, setCountry] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [search, setSearch] = useState('');
    const [copyCode, setCopyCode] = useState('COPIAR CÓDIGO');
    const [dataCode, setDataCode] = useState({
        title: '',
        promotionId: '',
        description: '',
        dateAdded: '',
        endDate: '',
        terms: '',
        type: '',
        urlTracking:'',
        image: '',
        voucher: {
            code: ''
        },
    });
    let [isOpen, setIsOpen] = useState(false)

    const parameters = {
        filters: {
          advertiserIds: advertiserIds,
          exclusiveOnly: false,
          membership: 'joined',
          regionCodes: ['MX', 'US', 'CA', 'GB', 'ES', 'AR', 'CH', 'CO', 'PE'],
          status: 'active',
          type: 'all'
        },
        pagination: {
          page: 1
        }
    }

    const requestOptions = {

        method: 'POST',
        headers: {
            'mode': 'no-cors',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://api.awin.com',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(parameters)
    };

    const getPromotions = async () => {
		fetch(`${BASE_URL}/${publisherId}/promotions`, requestOptions)
            .then((response) => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("Error en la solicitud POST");
                }
            }).then((responseData) => {
                setProducts(responseData);
                console.log('response = ', responseData);
            }).catch((error) => {
                console.error(error);
            });
	};

    //getPromotions();

    const handleChange = (e:any) => {
        setSearch(e.target.value)
    }

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    const results = !search ? products: products.filter((data) => data.title.toLowerCase().includes(search.toLocaleLowerCase()))

    const onChangeOption = (value: any) => {
        setCountry(value);
        onSaveLogEvent('country_name', value)

        switch (value) {
            case 'AR': setProducts(DataAR); break;
            case 'BR': setProducts(DataBR); break;
            case 'CA': setProducts(DataCA); break;
            case 'CL': setProducts(DataCL); break;
            case 'CO': setProducts(DataCO); break;
            case 'ES': setProducts(DataES); break;
            case 'GB': setProducts(DataGB); break;
            case 'MX': setProducts(DataMX); break;
            case 'PE': setProducts(DataPE); break;
            case 'US': setProducts(DataUS); break;
            case 'AT': setProducts(DataAT); break;
            case 'BE': setProducts(DataBE); break;
            case 'BG': setProducts(DataBG); break;
            case 'HR': setProducts(DataHR); break;
            case 'CZ': setProducts(DataCZ); break;
            case 'DK': setProducts(DataDK); break;
            case 'FI': setProducts(DataFI); break;
            case 'FR': setProducts(DataFR); break;
            case 'DE': setProducts(DataDE); break;
            case 'GR': setProducts(DataGR); break;
            case 'HU': setProducts(DataHU); break;
            case 'IE': setProducts(DataIE); break;
            case 'IT': setProducts(DataIT); break;
            case 'LV': setProducts(DataLV); break;
            case 'LT': setProducts(DataLT); break;
            case 'NL': setProducts(DataNL); break;
            case 'NO': setProducts(DataNO); break;
            case 'PL': setProducts(DataPL); break;
            case 'PT': setProducts(DataPT); break;
            case 'RO': setProducts(DataRO); break;
            case 'SK': setProducts(DataSK); break;
            case 'SI': setProducts(DataSI); break;
            case 'SE': setProducts(DataSE); break;
            case 'CH': setProducts(DataCH); break;
            case 'UA': setProducts(DataUA); break;
        }
    };

    const onClickDataCode = (value:any) => {
        setDataCode({
            title: value.title,
            promotionId: value.promotionId,
            description: value.description,
            dateAdded: value.dateAdded,
            endDate: value.endDate,
            terms: value.terms,
            type: value.type,
            urlTracking:value.urlTracking,
            image: `https://ui.awin.com/images/upload/merchant/profile/` + `${value?.advertiser?.id}` + '.png',
            voucher: value.voucher
        })
        if(dataCode.dateAdded.length > 0) {
            openModal()
            onSaveLogEvent('brand', value.title)
        }
    };

    const onSaveLogEvent = (params:any, value:any) => {
        logEvent(analytics!, params, {name: value});
    }

    const onClickCopy = () => {
        copy(dataCode.voucher.code);
        setCopyCode('¡CÓDIGO COPIADO!')
        onSaveLogEvent('brand_code', dataCode.voucher.code)
    };

    const goStore = () => {
        onSaveLogEvent('go_store', dataCode.title)
    }

    const closeModal = () => {
        setIsOpen(false)
        copy('');
        setCopyCode('COPIAR CÓDIGO')
    }

    const openModal = () => {
        setIsOpen(true)
    }

    return (
        <>
            <div className="bg-lightgrey py-8" id="blog-section">
                <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 '>

                    <div className='blog-section-data grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-16 gap-x-16 lg:gap-x-32'>
                        {results.map((item: any, i: any) => (
                            <div key={i} style={{cursor:'pointer'}} className='bg-white rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group' onClick={() => {onClickDataCode(item)}}>
                                <div className='blog-section-data center'>
                                    <Image
                                        src={`https://ui.awin.com/images/upload/merchant/profile/` + `${item?.advertiser?.id}` + '.png'}
                                        alt={item.description}
                                        width={100}
                                        height={85} />
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MultipleItems;
