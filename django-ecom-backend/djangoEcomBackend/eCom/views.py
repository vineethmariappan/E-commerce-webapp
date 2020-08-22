from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from .models import Customer_detail,Product_detail,Supplier,Order_list,Payment,Wish_List,Category
from .serializers import Customer_detail_Serializer, Supplier_Serializer, Payment_Serializer, Product_detail_Serializer, Order_list_Serializer, Wish_List_Serializer, Category_Serializer
from rest_framework.filters import SearchFilter,OrderingFilter
from django.http import HttpResponse
from knox.models import AuthToken
from rest_framework import generics, permissions

class Customer_detail_ViewSet(viewsets.ModelViewSet):
    queryset=Customer_detail.objects.all()
    serializer_class=Customer_detail_Serializer

class Product_detail_ViewSet(viewsets.ModelViewSet):
    queryset=Product_detail.objects.all()
    serializer_class=Product_detail_Serializer
    filter_backends= [SearchFilter, OrderingFilter]
    search_fields=['prod_name','category__category_name']
    def create(self, request):
        cover=request.data['cover']
        prod_name=request.data['prod_name']   
        availability=int(request.data['availability'])
        category=request.data['category']
        price=int(request.data['price'])
        rating=int(request.data['rating'])
        supplier=int(request.data['sup_id'])
        print(prod_name)
        print(availability)
        print(price)
        sup_obj = Supplier.objects.get(sup_id = supplier)
        catag_obj = Category.objects.get(category_name = category)
        Product_detail.objects.create(prod_name=prod_name,cover=cover,availability=1,price=price,rating=1,category=catag_obj,sup_id=sup_obj)
        return HttpResponse({'message' : 'Product Created'},status=200)

class Supplier_ViewSet(viewsets.ModelViewSet):
    queryset=Supplier.objects.all()
    serializer_class=Supplier_Serializer

class Order_list_ViewSet(viewsets.ModelViewSet):
    queryset=Order_list.objects.all()
    serializer_class=Order_list_Serializer


class Category_ViewSet(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class=Category_Serializer
class Payment_ViewSet(viewsets.ModelViewSet):
    queryset=Payment.objects.all()
    serializer_class=Payment_Serializer


class Wish_List_ViewSet(viewsets.ModelViewSet):
    queryset=Wish_List.objects.all()
    serializer_class=Wish_List_Serializer


