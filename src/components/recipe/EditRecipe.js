import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import {  EditorState } from "draft-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom"
import CreatableSelect from 'react-select/creatable';

const EditRecipe = () => {
    const { id } = useParams();
    const [dataRecipe, setDataRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState('');

    const [recipe_name, setRecipe_name] = useState('')
    const [recipe_introduction, setRecipe_introduction] = useState('')
    const [recipe, setRecipe] = useState('')
    const [image, setImage] = useState('');
    const imageRef = useRef();
    

    useEffect(() => {
        axios.put(`http://localhost:5000/recipe/${id}`).then(data => setDataRecipe(data.data.data.data.result))
    }, [])
    useEffect(() => {
        axios.get('http://localhost:5000/recipe/common').then((response) => {

            setOptions(response.data);
        });
    }, [])
    const createOption = (value) => ({
        label: value,
        value: value.toLowerCase().replace(/\W/g, ''),
    });
    const handleCreate = (inputValue) => {
        setIsLoading(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading(false);
            axios.post(
                "http://localhost:5000/recipe/common", {
                key: "country",
                label: inputValue,
                value: inputValue,
            })
            setOptions((prev) => [...prev, newOption]);
            setValue(newOption);
        }, 1000);
    }
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const url = URL.createObjectURL(acceptedFiles[0]);
        setImage(url);
        imageRef.current = file;
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const recipe_details = editorState.getCurrentContent().getPlainText();
    const handleChange = (data) => {
        setEditorState(data);
    };
    const onImageUpload = (file) => {
        return new Promise((resolve, reject) => {
            uploadCallback(file)
                .then((response) => {
                    // setUploadImage(true);
                                        resolve({ data: { link: response.data.link } });
                                    })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const navigate= useNavigate();
    const uploadCallback = (file) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "sttruyenxyz");
            
        });
    };
    const handleBackPage = () => {
        navigate(-1);
    }

    const handleEditRecipe = (id) =>{
        axios.put(`/recipe/${id}`,{
            name: recipe_name.trim() == "" ? dataRecipe.name : recipe_name,
            introduction: recipe_introduction.trim() == "" ? dataRecipe.introduction : recipe_introduction,
            recipes: recipe_details.trim() == "" ? dataRecipe.recipes : recipe_details,
            tags: [
                {
                    k: "image",
                    v: "https://res.cloudinary.com/sttruyen/image/upload/v1694421667/ea4r3uwdjmkobr1mpmkg.jpg",

                },
                {
                    k: "country",
                    v: value.value,

                }
            ]
            
        }).then(() => {navigate(-1)})
    }
    console.log(recipe_details);
    
    return (
        <div className='create_recipe_container'>
            <div class="wrapper">
                <div class="inner">
                    <div class="image-holder">
                        <div style={{
                            width: '400px',
                            height: "500px", border: "1px solid rgba(0,0,0,0.1)"
                        }} className='d-flex justify-content-center align-items-center' {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                !image ? <div>
                                    <div className='d-flex justify-content-center'>
                                        <i style={{ fontSize: "50px", color: "rgba(0,0,0,0.7)" }} className="fa-solid fa-image"></i>
                                    </div>
                                    <div>
                                        <i>
                                            Thêm ảnh tại đây
                                        </i>
                                    </div>
                                </div> :
                                    <img style={{ width: "400px", height: "500px", objectFit: "cover" }} src={image} alt="" />
                            }
                        </div>
                    </div>
                    <div style={{ width: "400px" }} className='create_form' action="">
                        <h3 style={{ marginBottom: "30px" }}>Tạo công thức</h3>
                        <div class="form-holder active w-100">
                            <textarea style={{ width: "100%", minHeight: "100px" }} type="text" class={`form-control `} placeholder={dataRecipe.name} onChange={e => { setRecipe_name(e.target.value);  }} />
                        </div>
                        <div class="form-holder active">
                            <textarea style={{ width: "100%", minHeight: "200px" }} type="text"  class="form-control" placeholder={dataRecipe.introduction} onChange={e => setRecipe_introduction(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='create_form-2'>
                    <div style={{ margin: "10px 0" }} class="form-holder active w-100">
                        <CreatableSelect onChange={(newValue) => setValue(newValue)}
                            isClearable
                            isLoading={isLoading}
                            onCreateOption={handleCreate}
                            options={options}
                            value={value}
                            placeholder="Chọn quốc gia"
                        />
                    </div>
                </div>
                <div className='recipe_create'>
                    <h3 style={{ marginTop: "20px" }}>Công thức</h3>
                    <div className={`recipe_create_edit `}>
                        <div>
                            Công thức đang hiển thị: <br></br>
                            {dataRecipe.recipes}
                        </div>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={handleChange}
                            wrapperClassName="editor-wrapper"
                            editorClassName="message-editor"
                            toolbarClassName="message-toolbar"
                            toolbar={{
                                options: [
                                    "inline",
                                    "blockType",
                                    "fontSize",
                                    "list",
                                    "textAlign",
                                    "image",
                                    "emoji",
                                    "link",
                                    "history",
                                ],

                                image: {
                                    uploadEnabled: true,
                                    uploadCallback: onImageUpload,
                                    previewImage: true,
                                    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                                    alt: { present: false, mandatory: false },
                                    defaultSize: {
                                        height: "200px",
                                        width: "200px",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div style={{ marginTop: "30px", marginBottom: "20px" }} className='d-flex justify-content-center' >
                        <button onClick={() => handleEditRecipe(id)}>update</button>
                    </div>
                </div>
            </div>
            <div className='back_button'>
                <button onClick={handleBackPage}> <i style={{ marginRight: "10px" }} className="fa-solid fa-arrow-left"></i>Quay lại</button>
            </div>
        </div>
    )
}
export default EditRecipe