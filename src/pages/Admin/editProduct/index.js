import React, { useState, useEffect } from "react";
import { firestore, updateProduct } from "../../../firebase/utils";
import { useParams, useHistory } from "react-router-dom";
import CKEditor from "ckeditor4-react";
import {
  fetchProductStart,
  setProduct,
} from "./../../../redux/Products/products.actions";
import Button from "./../../../components/Forms/Button";
import FormInput from "./../../../components/Forms/FormInput";
import { useDispatch, useSelector } from "react-redux";

const mapState = (state) => ({
  product: state.productsData.product,
});

const EditProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { product } = useSelector(mapState);
  const [productDescr, setProductDescr] = useState(null);

  var {
    productThumbnail,
    productName,
    productPrice,
    productCategory,
    productDesc,
    productAdminUserUID,
    productInUse,
  } = product;

  console.log(product);

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productName = document.getElementById("productnaam").value;
    const productPrice = document.getElementById("productprijs").value;
    const productCategory = document.getElementById("productcategorie").value;
    const productThumbnail = document.getElementById("producturl").value;
    var productDescription = "";

    if (productDescr === null) {
      productDescription = productDesc;
    } else {
      productDescription = productDescr;
    }

    productDesc = productDescription;
    const id = productID;

    const productData = {
      productName,
      productPrice,
      productCategory,
      productThumbnail,
      productDesc,
      id,
      productAdminUserUID,
      productInUse,
    };
    console.log(productData);

    try {
      await updateProduct(productData);
    } catch (error) {
      console.log(error);
    } finally {
      history.push("/admin");
    }
  };

  return (
    <div>
      <h2>Edit product:</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div style={{ justifyContent: "center", marginTop: "30px" }}>
            <div>
              <FormInput
                id="productnaam"
                label="Productnaam"
                type="text"
                required="required"
                defaultValue={productName}
              />
            </div>

            <div style={{ paddingBottom: "1rem" }}>
              <FormInput
                id="productprijs"
                label="Productprijs"
                type="text"
                required="required"
                defaultValue={productPrice}
              />
            </div>

            <label>
              Categorie
              <FormInput
                id="productcategorie"
                name="productCategory"
                htmlFor="productCategorie"
                required
                defaultValue={productCategory}
              ></FormInput>
            </label>

            <div style={{ paddingTop: "1rem" }}>
              <FormInput
                id="producturl"
                label="Producturl"
                type="Url"
                name="productThumbnail"
                required="required"
                defaultValue={productThumbnail}
              />
            </div>

            <div>
              <CKEditor
                id="productdesc"
                data={productDesc}
                name="productDesc"
                htmlFor="productDesc"
                onChange={(evt) => setProductDescr(evt.editor.getData())}
              />
            </div>
            <br />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
