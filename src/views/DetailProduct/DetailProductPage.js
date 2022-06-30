import React, { useState, useEffect } from 'react';
import { Star, Heart, Share, IconDenied, IconCaution, IconUTCall, IconMail, IconSuccess, HeartBlack, Admin } from "../../assets/icons"
import { Modal } from '@material-ui/core';
import ModalLogin from "../../components/ModalLogin/ModalLogin"
import Viewer from 'react-viewer';
import { FaLink } from "react-icons/fa"

const DetailProductPage = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState(0);
    const [openModalErrReview, setOpenModalErrReview] = useState(false);
    const [login, setLogin] = useState(false);
    const [viewImage, setViewImage] = useState(false);
    const [imageAttribute, setImageAttribute] = useState(false);

    const productId = props.match.params.productId;
    const productUrl = window.location.href;
    const cleanUrl = productUrl;

    useEffect(() => {
        async function fetchData() {
            await props.fetchDetailProduct(productId);
        }
        fetchData();
    }, [props.user]);

    const _tambahFavorit = async () => {
        const { user, detailProduct } = props;
        if (detailProduct?.isWishlisted) {
            if (user) {
                await props.fetchDeleteSigleWishlist(user.tokenResponse.accessToken, [productId])
                await props.fetchDetailProduct(productId);
                console.log("DELETE WISHLISTED");
            } else {
                console.log("LOGIN DELETE");
                setLogin(true);
            }
        } else {
            if (user) {
                await props.fetchAddWishlist(user.tokenResponse.accessToken, { productId })
                await props.fetchDetailProduct(productId);
                console.log("ADD WISHLISTED");
            } else {
                console.log("LOGIN ADD");
                setLogin(true);
            }
        }
    };

    const _handleLogin = async (data) => {
        await props.login(data);
        setLogin(false);
    };
    const _handleShowImage = () => {
        setViewImage(true);
    }
    const _handleCloseImage = () => {
        setViewImage(false);
    }

    const imageViewToolbar = (toolbar) => {
        return toolbar.concat([
            {
                key: "copy",
                render: <FaLink onClick={() => copyButtonClick()} />
            },
        ]);
    }

    const copyToClipboard = (text) => {
        let copas = document.createElement('textarea')
        copas.innerText = text
        document.body.appendChild(copas)
        copas.select()
        document.execCommand('copy')
        copas.remove()
    }

    const copyButtonClick = () => {
        copyToClipboard(cleanUrl);
        setImageAttribute(true)
    }

    const _renderImage = () => {
        if (props.detailProduct !== null) {
            if (props.detailProduct.imageUrls !== undefined) {
                return (
                    <div className=''>
                        <div className=''>
                            <div className='flex flex-row justify-center items-center'>
                                <img src={props.detailProduct.imageThumbnailUrl} className="w-auto h-80 mt-8" />
                            </div>
                        </div>
                        <div className='flex flex-row items-start mt-12 mx-28'>
                            {props.detailProduct.imageUrls.map((item) => {
                                return (
                                    <div className='flex flex-row'>
                                        <img src={item} className="w-auto h-20 px-4" />
                                        <img src={item} className="w-auto h-20" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }
        }
    };


    const _beliSekarang = async () => {
        const {user} = props;
        if (user) {
            console.log("BELI SEKARANG");
        } else {
            setLogin(true);
        }
    }

    const _renderDesc = () => {
        if (props.detailProduct !== null) {
            return (
                <div>
                    <p className='text-2xl text-gray-500'>{props.detailProduct.brandName}</p>
                    <p className='text-3xl font-bold'>{props.detailProduct.materialName}</p>
                    <div className='flex flex-row items-center my-2'>
                        <img src={Star} className="w-auto h-5" />
                        <p className="text-xl font-bold ml-4">{props.detailProduct.rating}</p>
                        <p className='text-xl ml-2 text-gray-500'>{`(${props.detailProduct.reviewCount} Ulasan)`}</p>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-2 items-center'>
                        <p className='text-3xl font-bold' style={{ color: '#fa591d' }}>Rp. {props.detailProduct.promotionPrice}</p>
                        <p className='px-8 line-through'>Rp. {props.detailProduct.basePrice}</p>
                        <div className='flex items-center justify-center bg-red-300 w-12 h-6 rounded-full'>
                            <p className='text-red-700 text-sm font-semibold'>{props.detailProduct.discountPercent}</p>
                        </div>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center'>
                        <p className='text-lg text-gray-500 w-48'>Kode Produk</p>
                        <p className='text-lg font-bold text-gray-500'>{props.detailProduct.materialNumber}</p>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center'>
                        <p className='text-lg text-gray-500 w-48'>Model Unit</p>
                        <div className='w-20 h-7 bg-gray-100 border border-gray-400 rounded-lg text-center font-semibold'>
                            <p>{props.detailProduct.modelUnit}</p>
                        </div>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center'>
                        <p className='text-lg text-gray-500 w-48'>Kategori</p>
                        <p className='text-lg font-bold text-gray-500'>{props.detailProduct.category}</p>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center'>
                        <p className='text-lg text-gray-500 w-48'>Berat</p>
                        <p className='text-lg font-bold text-gray-500'>{`${props.detailProduct.weight} gram`}</p>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center'>
                        <p className='text-lg text-gray-500 w-48'>Dimensi Produk</p>
                        <div className='flex flex-col items-center justify-center'>
                            <p className='flex items-center text-lg font-bold text-gray-500'>{props.detailProduct.length} x {props.detailProduct.width} x {props.detailProduct.height} cm <div className='flex text-sm -mt-3'>3</div></p>
                        </div>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center'>
                        <p className='text-lg text-gray-500 w-48'>Pengiriman</p>
                        <p className='text-lg font-bold text-gray-500'>{props.detailProduct?.isCourierAvaliable ? "Dapat dikirim" : "Ambil di cabang"}</p>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3'>
                        <div className='flex flex-row items-center justify-center cursor-pointer'>
                            <p className='w-10 h-10 text-center border border-gray-300' onClick={quantity < 2 ? null : () => setQuantity(quantity - 1)}>-</p>
                            <p className='w-16 h-10 text-center border border-gray-300'>{quantity}</p>
                            <p className='w-10 h-10 text-center border border-gray-300' onClick={() => setQuantity(quantity + 1)}>+</p>
                        </div>
                        <div className='flex flex-row px-4' onClick={() => _beliSekarang()}>
                            <div className='px-4'>
                                <button className='w-36 h-12 font-semibold rounded-lg border border-black'>Beli Sekarang</button>
                            </div>
                            <button className='w-44 h-12 font-semibold rounded-lg' style={{ backgroundColor: '#ffd500' }}>Masukkan Keranjang</button>
                        </div>
                    </div>
                </div>
            )
        }
    };

    const _renderDescription = () => {
        if (description === 0) {
            if (props.detailProduct !== null) {
                return (
                    <div className='container mx-auto px-12 mt-4'>
                        <p className='text-gray-600'>{props.detailProduct.materialDescription}</p>
                    </div>
                )
            } else {
                if (props.detailProduct !== null) {
                    return (
                        <div className='container mx-auto px-12 mt-4'>
                            <p></p>
                        </div>
                    )
                }
            }
        }
    };

    const _renderModalErrReview = () => {
        return (
            <Modal
                open={openModalErrReview}
                onClose={() => setOpenModalErrReview(false)}
                style={{ borderRadius: '10px' }}
                className="flex justify-center items-center m-auto p-0">
                <div style={{ height: "65vh", width: "25%" }}
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-white"
                >
                    <p className="text-2xl font-bold my-2">Ulasan Produk</p>
                    <div className="my-4">
                        <img src={IconCaution} className="w-auto h-24" />
                    </div>
                    <p className="mb-4 text-xl text-gray-500">Ulasan Produk masih kosong</p>
                    <div className="flex justify-center items-center">
                        <button className="h-9 w-72 font-semibold rounded-lg"
                            style={{ backgroundColor: '#ffd500' }}
                            onClick={() => setOpenModalErrReview(false)}
                        >OK</button>
                    </div>
                    <p className="mt-6 text-sm">Butuh informasi tambahan? Kontak kami</p>
                    <div className="flex flex-row justify-center items-center mt-6 cursor-pointer">
                        <img src={IconUTCall} className="w-auto h-10 px-8" />
                        <img src={IconMail} className="w-auto h-10" />
                    </div>
                </div>
            </Modal>
        )
    }

    const _renderModalLogin = () => {
        return (
            <ModalLogin
                isOpen={login}
                isClose={() => setLogin(false)}
                login={_handleLogin}
            />
        )
    }

    return (
        <div className='mt-24'>
            <Viewer
                visible={viewImage}
                onClose={() => _handleCloseImage()}
                images={[{ src: props.detailProduct?.imageThumbnailUrl, alt: 'Copied to clipboard: ' + cleanUrl }]}
                noNavbar={true}
                noImgDetails={true}
                attribute={imageAttribute}
                customToolbar={toolbars => imageViewToolbar(toolbars)}
            />
            <p className='container mx-auto px-8 font-semibold'>
                <span className='text-blue-400'>
                    Part Online Transaction &gt;
                </span> Detail Produk</p>
            <div className='mt-6'>
                <div className='flex flex-col md:flex-row'>
                    <div style={{ width: '48rem' }}>
                        {_renderImage()}
                    </div>
                    <div style={{ width: '36rem' }}>
                        {_renderDesc()}
                    </div>
                </div>
            </div>
            <hr className='w-full my-4' />
            <div className='container mx-auto px-8'>
                <div className='flex flex-wrap'>
                    <div className='flex flex-row px-4 cursor-pointer'>
                        <p className={description === 0 ? "text-2xl font-bold inline-block border-b-4 border-yellow-400 py-1" : "text-2xl text-gray-500 font-bold"}
                            // style={description === 0 ? { borderBottom: "3px solid #ffd500" } : {}}
                            onClick={() => setDescription(0)}>
                            {props.detailProduct !== null ? "Deskripsi" : ''}
                        </p>
                        <p className={description === 1 ? "text-2xl font-bold inline-block border-b-4 border-yellow-400 py-1 ml-16" : 'text-2xl text-gray-500 font-bold ml-16'}
                            // style={description === 1 ? { borderBottom: "3px solid #ffd500" } : {}}
                            onClick={() => props.detailProduct.reviewCount < 1 ? setOpenModalErrReview(true) : setDescription(1)}
                        >
                            {props.detailProduct !== null ? `Ulasan(${props.detailProduct.reviewCount})` : ''}
                        </p>
                    </div>
                    {props.detailProduct !== null ?
                        <div className='flex flex-row items-center justify-end flex-1'>
                            <p className='text-2xl text-gray-600 -mr-16 px-4 cursor-pointer' onClick={() => _tambahFavorit()} >Favorit</p>
                            <div className='w-6 h-6 rounded-full bg-gray-300 mx-14 flex items-center justify-center' onClick={() => _tambahFavorit()}>
                                <img src={props.detailProduct.isWishlisted ? Heart : HeartBlack} className="w-3 h-auto cursor-pointer" />
                            </div>
                            <p className='text-2xl text-gray-600 px-2 cursor-pointer' onClick={() => _handleShowImage()}>Bagikan</p>
                            <div className='w-6 h-6 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center' onClick={() => _handleShowImage()}>
                                <img src={Share} className="w-3 h-auto" />
                            </div>
                        </div> : null
                    }
                </div>
            </div>
            <hr className='w-full' />
            {_renderDescription()}
            {_renderModalErrReview()}
            {_renderModalLogin()}
        </div>
    )
}

export default DetailProductPage;