from fastapi import FastAPI, HTTPException, File, UploadFile, Form, Response, Request, Header
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.responses import JSONResponse, UJSONResponse, FileResponse
from dateutil.relativedelta import relativedelta
from functools import reduce
import openpyxl
from openpyxl.utils import range_boundaries
import random
from calendar import monthrange
from typing import List, Optional, Union
import traceback
from fastapi import FastAPI
from pydantic import BaseModel

from configparser import ConfigParser
import psycopg2
import pandas as pd

from datetime import datetime

from pytz import timezone

import json
import traceback
from requests.auth import HTTPDigestAuth

import uvicorn
import firebase_admin 
from firebase_admin import db

app = FastAPI()

origins = [    
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

hostname = 'marine-parts.ailab.vn'                                                                          


cred_obj = firebase_admin.credentials.Certificate('datahub-aa799-firebase-adminsdk-mw2nq-44f836530f.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL': 'https://datahub-aa799-default-rtdb.asia-southeast1.firebasedatabase.app'
	})

# class ProductBase(BaseModel):
#     main_category: str
#     middle_category: str
#     subcategory: str
#     Name: str
#     Price: str
#     Url: str
#     Source: str
#     DataInfo: str
#     Info: str
    


# class ProductList(BaseModel):
#     data: list = Form(...)

@app.post("/products/delete")
def insert_products():
    ref = db.reference('products/amazon')
    ref.delete()

    return {
        'status': 'success'
    }

@app.post("/products/insert")
def insert_products(
    data: list = Form(...),
    source: str = Form(...),
    main_category: str = Form(...)
    ):    
    # print(json.loads(data[0]))
    # df = pd.DataFrame(json.loads(data[0]))
    
    # print("products/{}/{}/".format(source,main_category))
    ref = db.reference("products/{}/{}/".format(source,main_category))
    # ref.delete()
    ref.push().set(json.loads(data[0]))
    # Load data
    # ref = db.reference('products/{}'.format(source))
    snapshot_date = ref.order_by_key().get()
    df = pd.DataFrame(snapshot_date[list(snapshot_date.keys())[0]])
    df = df.fillna('')
    return {
        'status': 'success',
        'data': df.to_dict('records')
    }
    # ref = db.reference("products/")
    # print(ref.get())
    #     
@app.post("/products/fetch")
def fetch_products(
    source: str= Form(...),
    main_category: str = Form(...)
    ):            
    ref = db.reference('products/{}/{}'.format(source,main_category))
    print('products/{}/{}'.format(source,main_category))
    snapshot_date = ref.order_by_key().get()    
    df = pd.DataFrame(snapshot_date[list(snapshot_date.keys())[0]])
    df = df.fillna('')
    return {
        'status': 'success',
        'data': df.to_dict('records')
    }

@app.post("/images/delete")
def insert_products():
    ref = db.reference('images/svb24')
    ref.delete()

    return {
        'status': 'success'
    }

@app.post("/images/insert")
def insert_images(
    data: list = Form(...),
    source: str = Form(...),
    main_category: str = Form(...)
    ):    
    # print(json.loads(data[0]))
    # df = pd.DataFrame(json.loads(data[0]))
    
    # print("images/{}/{}/".format(source,main_category))
    ref = db.reference("images/{}/{}/".format(source,main_category))
    # ref.delete()
    ref.push().set(json.loads(data[0]))
    # Load data
    # ref = db.reference('products/{}'.format(source))
    snapshot_date = ref.order_by_key().get()
    df = pd.DataFrame(snapshot_date[list(snapshot_date.keys())[0]])
    df = df.fillna('')
    return {
        'status': 'success',
        'data': df.to_dict('records')
    }

@app.post("/images/fetch")
def fetch_images(
    source: str= Form(...),
    main_category: str = Form(...)
    ):            
    ref = db.reference('images/{}/{}'.format(source,main_category))
    snapshot_date = ref.order_by_key().get()    
    df = pd.DataFrame(snapshot_date[list(snapshot_date.keys())[0]])
    df = df.fillna('')
    return {
        'status': 'success',
        'data': df.to_dict('records')
    }

@app.get("/products/fetch/analytics")
def fetch_products_analytics(    
    ):            

    df_total = pd.read_excel('total_product_details.xlsx', engine='openpyxl')
    df_total['total'] = df_total.shape[0]
    df_source = df_total.groupby(['Source'])['Name'].count()
    df_source = df_source.reset_index()
    df_source['percent'] = round((df_source['Name'] / df_total.shape[0]) * 100,2)

    return {
        'status': 'success',
        'data': df_source.to_dict('records')
    }

@app.get("/images/fetch/analytics")
def fetch_images_analytics(    
    ):            

    df_total = pd.read_excel('total_product_images.xlsx', engine='openpyxl')
    df_total['total'] = df_total.shape[0]
    df_source = df_total.groupby(['source'])['name'].count()
    df_source = df_source.reset_index()
    df_source['percent'] = round((df_source['name'] / df_total.shape[0]) * 100,2)

    return {
        'status': 'success',
        'data': df_source.to_dict('records')
    }

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=5002,
        ssl_keyfile="cert/privkey.pem",
        ssl_certfile="cert/cert.pem",
        )

